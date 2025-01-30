import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createClient } from "@supabase/supabase-js";

async function uploadImageToSupabase(file, folder) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase URL and Key are required");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Generate a unique filename
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
    const filePath = `${folder}/${fileName}`;

    // Convert Blob to ArrayBuffer and then Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Upload the file
    const { data, error: uploadError } = await supabase.storage
      .from("properties")
      .upload(filePath, fileBuffer, {
        contentType: file.type || "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Upload error: ${uploadError.message}`);
    }

    // Get the public URL
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("properties")
      .getPublicUrl(filePath);

    if (publicUrlError) {
      throw new Error(`Public URL error: ${publicUrlError.message}`);
    }

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    console.log(formData)

    const userId = formData.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Handle main image upload
    const mainImage = formData.get("mainImage");
    let mainImageUrl = "";
    if (mainImage && mainImage instanceof File && mainImage.size > 0) {
      mainImageUrl = await uploadImageToSupabase(mainImage, "main-images");
    }

    // Handle gallery images upload
    let galleryUrls = [];
    const galleryFiles = formData.getAll("gallery[]");
    if (galleryFiles.length > 0) {
      const uploadPromises = galleryFiles
        .filter((file) => file instanceof File && file.size > 0)
        .map((file) => uploadImageToSupabase(file, "gallery-images"));
      galleryUrls = await Promise.all(uploadPromises);
    }

    // Create property only if we have valid image URLs
    const property = await prisma.property.create({
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        image: mainImageUrl || undefined,
        gallery: galleryUrls.length > 0 ? galleryUrls : undefined,
        price: Number(formData.get("price")),
        type: formData.get("type"),
        amenities: formData.getAll("amenities").map(String) || [],
        agent: {
          connect: {
            id: userId,
          },
        },
        location: {
          create: {
            region: formData.get("region"),
            district: formData.get("district"),
            area: formData.get("area"),
            nearbyLandmarks: formData.getAll("nearbyLandmarks").map(String) || [],
            distanceToTown: formData.get("distanceToTown"),
          },
        },
        specifications: {
          create: {
            bedrooms: Number(formData.get("bedrooms")),
            bathrooms: Number(formData.get("bathrooms")),
            squareFootage: Number(formData.get("squareFootage")),
            furnished: formData.get("furnished") === "true",
            yearBuilt: Number(formData.get("yearBuilt")),
          },
        },
        utilities: {
          create: {
            water: formData.get("water") === "true",
            electricity: formData.get("electricity") === "true",
            internet: formData.get("internet") === "true",
            maintenance: formData.get("maintenance"),
          },
        },
        leaseTerms: {
          create: {
            minimumStay: formData.get("minimumStay"),
            securityDeposit: Number(formData.get("securityDeposit")),
            petsAllowed: formData.get("petsAllowed") === "true",
            availableFrom: new Date(formData.get("availableFrom") || Date.now()),
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create property" },
      { status: 500 }
    );
  }
}



export async function GET(request) {
  try {
    const properties = await prisma.property.findMany({
      include: {
        location: true,
        specifications: true,
        utilities: true,
        leaseTerms: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(properties)
    return NextResponse.json({ properties });
  } catch (error) {
    console.error("Error fetching all properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch all properties" },
      { status: 500 }
    );
  }
}

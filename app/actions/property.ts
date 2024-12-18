"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

async function uploadImageToSupabase(file: File, folder: string) {
  try {
    const supabase = createClient();

    // Generate a unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload the file
    const { data, error: uploadError } = await supabase.storage
      .from("properties")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Upload error: ${uploadError.message}`);
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("properties").getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function createProperty(formData: FormData) {
  try {
    // Handle main image upload
    const mainImage = formData.get("mainImage") as File;
    let mainImageUrl = "";
    if (mainImage && mainImage.size > 0) {
      mainImageUrl = await uploadImageToSupabase(mainImage, "main-images");
    }

    // Handle gallery images upload
    const galleryFiles = formData.getAll("gallery") as File[];
    const galleryUrls = await Promise.all(
      galleryFiles
        .filter((file) => file.size > 0)
        .map((file) => uploadImageToSupabase(file, "gallery-images"))
    );

    const property = await prisma.property.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: mainImageUrl,
        gallery: galleryUrls,
        price: Number(formData.get("price")),
        type: formData.get("type") as string,
        amenities: formData.getAll("amenities").map(String),

        location: {
          create: {
            region: formData.get("region") as string,
            district: formData.get("district") as string,
            area: formData.get("area") as string,
            nearbyLandmarks: formData.getAll("nearbyLandmarks").map(String),
            distanceToTown: formData.get("distanceToTown") as string,
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
            maintenance: formData.get("maintenance") as string,
          },
        },

        leaseTerms: {
          create: {
            minimumStay: formData.get("minimumStay") as string,
            securityDeposit: Number(formData.get("securityDeposit")),
            petsAllowed: formData.get("petsAllowed") === "true",
            availableFrom: new Date(formData.get("availableFrom") as string),
          },
        },
      },
    });

    revalidatePath("/agent/dashboard");
    return { success: true, data: property };
  } catch (error) {
    console.error("Error creating property:", error);
    return { success: false, error: "Failed to create property" };
  }
}

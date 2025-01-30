import { prisma } from "$lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page")) || 1;
      const limit = parseInt(searchParams.get("limit")) || 10;
      const skip = (page - 1) * limit;
      console.log(searchParams)
  
      const properties = await prisma.property.findMany({
        skip,
        take: limit,
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
  
      const total = await prisma.property.count();
  
      return NextResponse.json({
        properties,
        metadata: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties" },
        { status: 500 }
      );
    }
  }
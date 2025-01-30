import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  const { userId, email, name, phone, experience, languages } = await request.json();
  console.log(userId, email, name, phone, experience, languages)
  try {
    // 2. Create the agent profile in Prisma
    if (userId) {
      const agent = await prisma.agent.create({
        data: {
          id:userId,
          name: name,
          email: email,
          phone: phone,
          experience: experience,
          languages: languages,
        }
      });

      return NextResponse.json(agent, { status: 201 });
    }

    return NextResponse.json({ error: "User not created" }, { status: 400 });
  } catch (error) {
    console.error("Error processing request:", error);
    
    // If the error is from Prisma, handle it specifically
    if (error.code) {
      switch (error.code) {
        case 'P2002': // Unique constraint violation
          return NextResponse.json(
            { error: "Email already exists" },
            { status: 409 }
          );
        default:
          return NextResponse.json(
            { error: "Database error occurred" },
            { status: 500 }
          );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get all agents
export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      include: {
        properties: true
      }
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}

// Delete an agent
export async function DELETE(request) {
  const { id } = await request.json();

  try {
    const deletedAgent = await prisma.agent.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json(deletedAgent);
  } catch (error) {
    console.error("Error deleting agent:", error);
    return NextResponse.json(
      { error: "Failed to delete agent" },
      { status: 500 }
    );
  }
}

// Update an agent
export async function PUT(request) {
  const { id, ...data } = await request.json();

  try {
    const updatedAgent = await prisma.agent.update({
      where: {
        id: id
      },
      data: data
    });

    return NextResponse.json(updatedAgent);
  } catch (error) {
    console.error("Error updating agent:", error);
    return NextResponse.json(
      { error: "Failed to update agent" },
      { status: 500 }
    );
  }
}










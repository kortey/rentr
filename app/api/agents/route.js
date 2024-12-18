import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  const { email, password, name, phone, experience, languages } = await request.json();
  
  try {
    // 1. Create the user account in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${request.headers.get('origin')}/auth/callback`
      }
    });

    if (authError) throw authError;

    // 2. Create the agent profile in Prisma
    if (authData.user) {
      const agent = await prisma.agent.create({
        data: {
          id: authData.user.id,
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










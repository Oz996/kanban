import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { description } = body;

    const newSubtask = await prisma.subtask.create({
      data: {
        description,
        completed: false,
        Task: {
          connect: {
            id: params.id,
          },
        },
      },
    });
    return NextResponse.json(newSubtask, { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to post subtask" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { completed } = body;

    const updatedSubtask = await prisma.subtask.update({
      where: {
        id: params.id,
      },
      data: {
        completed,
      },
    });
    return NextResponse.json(updatedSubtask, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to update subtask" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedSubtask = await prisma.subtask.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Subtask deleted" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to delete subtask" },
      { status: 500 }
    );
  }
}

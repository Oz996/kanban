import prisma from "@/lib/prisma";
import { columnSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedBody = columnSchema.parse(body);
    const { title, id } = validatedBody;

    const board = await prisma.board.findUnique({
      where: {
        id,
      },
    });

    if (!board) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    const column = await prisma.column.create({
      data: {
        title,
        Board: {
          connect: {
            id,
          },
        },
      },
    });

    return NextResponse.json(column, { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to create column" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title } = body;

    const updatedColumn = await prisma.column.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return NextResponse.json(updatedColumn, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to update column" },
      { status: 500 }
    );
  }
}

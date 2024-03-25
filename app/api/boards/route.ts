import prisma from "@/lib/prisma";
import { Column } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const boards = await prisma.board.findMany();
    return NextResponse.json(boards, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to retrieve boards" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, columns } = body;

    const board = await prisma.board.create({
      data: {
        title,
        columns: {
          createMany: {
            data: columns?.map((column: Column) => ({
              title: column.title,
            })),
          },
        },
      },
    });

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create board" },
      { status: 500 }
    );
  }
}

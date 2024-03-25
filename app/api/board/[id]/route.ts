import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("params", params);
    const board = await prisma.board.findUnique({
      where: {
        id: params.id,
      },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(board, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to retrieve board" },
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
    const { title } = body;

    const updatedBoard = await prisma.board.update({
      where: {
        id: params.id,
      },
      data: {
        title,
      },
    });
    return NextResponse.json(updatedBoard, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to updated board" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const columns = await prisma.column.findMany({
      where: {
        boardId: params.id,
      },
      include: {
        tasks: {
          include: {
            subtasks: true,
          },
        },
      },
    });

    for (const column of columns) {
      for (const task of column.tasks) {
        const deleteSubtasks = await prisma.subtask.deleteMany({
          where: {
            taskId: task.id,
          },
        });
      }

      const deleteTasks = await prisma.task.deleteMany({
        where: {
          columnId: column.id,
        },
      });
      const deleteColumn = await prisma.column.delete({
        where: {
          id: column.id,
        },
      });
    }

    const deleteBoard = await prisma.board.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Board deleted" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to delete board" },
      { status: 500 }
    );
  }
}

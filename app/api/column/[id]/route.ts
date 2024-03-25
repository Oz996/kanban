import prisma from "@/lib/prisma";
import { columnSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const validatedBody = columnSchema.parse(body);
    const { title } = validatedBody;

    const column = await prisma.column.create({
      data: {
        title,
        Board: {
          connect: {
            id: params.id,
          },
        },
      },
    });
    return NextResponse.json(column, { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to post column" },
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
    const { title, id } = body;

    const column = await prisma.column.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return NextResponse.json(column, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to update column" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("delete params", params);
  try {
    const tasks = await prisma.task.findMany({
      where: {
        columnId: params.id,
      },
      include: {
        subtasks: true,
      },
    });

    for (const task of tasks) {
      for (const subtask of task.subtasks) {
        const deleteSubtasks = await prisma.subtask.deleteMany({
          where: {
            taskId: task.id,
          },
        });

        const deleteTasks = await prisma.task.deleteMany({
          where: {
            columnId: params.id,
          },
        });
      }
    }

    const deleteColumn = await prisma.column.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Column deleted" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to delete column" },
      { status: 500 }
    );
  }
}

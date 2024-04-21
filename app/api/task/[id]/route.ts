import prisma from "@/lib/prisma";
import { Subtask } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, description, subtasks, status, columnId } = body;

    // Fetch the existing task from the database
    const existingTask = await prisma.task.findUnique({
      where: {
        id: params.id,
      },
      include: {
        subtasks: true,
      },
    });

    if (!existingTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // Update task details
    const updatedTask = await prisma.task.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        status,
        Column: {
          connect: {
            id: columnId,
          },
        },
      },
    });

    // Update each subtask
    for (const subtask of subtasks) {
      const existingSubtask = existingTask.subtasks.find(
        (subt) => subt.id === subtask.id
      );
      if (existingSubtask) {
        await prisma.subtask.update({
          where: {
            id: subtask.id,
          },
          data: {
            description: subtask.description,
            completed: subtask.completed,
          },
        });
      }
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleteSubtasks = await prisma.subtask.deleteMany({
      where: {
        Task: {
          id: params.id,
        },
      },
    });

    const deletedTask = await prisma.task.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}

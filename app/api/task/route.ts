import prisma from "@/lib/prisma";
import { Subtask } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, status, columnId, subtasks } = body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        subtasks: {
          createMany: {
            data: subtasks?.map((subtask: Subtask) => ({
              description: subtask?.description,
              completed: subtask?.completed,
            })),
          },
        },
        Column: {
          connect: {
            id: columnId,
          },
        },
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}

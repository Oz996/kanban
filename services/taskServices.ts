import {
  postTask,
  updateTask as updateTaskCall,
  postSubtask as postSubtaskCall,
} from "@/services/services";
import { invalidInputs } from "@/utils/invalidInputs";
import { Subtask, SubtaskInput, Task } from "@/types";
import React, { SetStateAction } from "react";
import { FieldValues } from "react-hook-form";

interface DataProps {
  subtasks: SubtaskInput[];
  setSubtasks?: React.Dispatch<SetStateAction<SubtaskInput[]>>;
  status: string | undefined;
  columnId: string | undefined;
  data?: FieldValues;
  task?: Task;
}

export const createTask = async (props: DataProps) => {
  const { subtasks, setSubtasks, status, columnId, data } = props;
  try {
    const invalid = invalidInputs("task", subtasks, setSubtasks!);
    if (invalid) return;

    const dataObject = {
      ...data,
      status,
      columnId,
      subtasks,
    };
    console.log("payload", dataObject);
    const res = await postTask(dataObject);
    return res;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateTask = async (props: any) => {
  const { subtasks, status, setSubtasks, columnId, data, task } = props;
  try {
    const invalid = invalidInputs("task", subtasks, setSubtasks!);
    if (invalid) return;

    const taskData = {
      ...data,
      status,
      subtasks,
      columnId,
    };
    console.log("payload", taskData);
    const res = await updateTaskCall(task!.id, taskData);
    return res;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const postSubtask = async (
  taskId: string,
  subtasks: SubtaskInput[],
  originalValues: Subtask[]
) => {
  try {
    for (const newSubtask of subtasks) {
      const originalSubtask = originalValues!.find(
        (subtask) => subtask.id === newSubtask.id
      );

      if (!originalSubtask) {
        console.log("new", newSubtask);
        await postSubtaskCall(taskId, newSubtask);
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

import { postTask, updateTask as updateTaskCall } from "@/app/api/services";
import { SubtaskInput, Task } from "@/types";
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
    const invalidSubtask = subtasks.filter(
      (subtask) => !subtask.description.trim()
    );
    if (invalidSubtask.length > 0) {
      for (const subtask of invalidSubtask) {
        subtask.error = "Can't be empty";
      }
      setSubtasks!([...subtasks]);
      return;
    }

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

export const updateTask = async (props: DataProps) => {
  const { subtasks, status, columnId, data, task } = props;
  try {
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

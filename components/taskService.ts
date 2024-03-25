import { getBaseUrl } from "@/lib/URL";
import { SubtaskInput, Task } from "@/types";
import axios from "axios";
import React, { SetStateAction } from "react";
import { FieldValues } from "react-hook-form";

interface DataProps {
  subtasks: SubtaskInput[];
  setSubtasks?: React.Dispatch<SetStateAction<SubtaskInput[]>>;
  status: string | undefined;
  columnId: string | undefined;
  data: FieldValues;
  task?: Task;
}

export const postTask = async (props: DataProps) => {
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
    await axios.post(getBaseUrl() + `/api/task/`, dataObject);
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
    await axios.put(getBaseUrl() + `/api/task/${task?.id}`, taskData);
  } catch (error: any) {
    console.error(error.message);
  }
};

import React, { SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Column, Task } from "@/types";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { successToast } from "@/utils/successToast";
import { updateTask } from "../../services/taskServices";
import { useBoard } from "@/hooks/useBoard";
import { errorToast } from "@/utils/errorToast";

interface props {
  task: Task;
  status: string;
  column: Column;
  columns: Column[];
  setStatus: React.Dispatch<SetStateAction<string>>;
}

export default function ViewTaskSelect({
  task,
  status,
  column,
  columns,
  setStatus,
}: props) {
  const queryClient = useQueryClient();
  const { board } = useBoard();
  const isLocked = board?.isLocked;

  const handleChangeTaskColumn = async (id: string) => {
    try {
      const { title, description, status, subtasks } = task!;

      const taskData = {
        title,
        description,
        status,
        subtasks,
        columnId: id,
        task,
      };
      console.log("payload", taskData);
      const taskStatus = await updateTask(taskData);

      if (taskStatus === 200) {
        queryClient.invalidateQueries(["board"] as InvalidateQueryFilters);
        successToast("Task", "updated");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleChange = (value: string) => {
    if (isLocked) return errorToast("edit");
    setStatus(value);
    const selectedColumn = columns?.find((column) => column.title === value);
    if (selectedColumn) {
      const id = selectedColumn.id;
      handleChangeTaskColumn(id);
    }
  };

  return (
    <Select value={status} onValueChange={handleChange}>
      <SelectTrigger className="col-span-3 bg-darkGrey input">
        <SelectValue placeholder={column.title} />
      </SelectTrigger>
      <SelectContent className="bg-veryDarkGrey input h-full text-white">
        <SelectGroup>
          {columns?.map((column) => (
            <SelectItem key={column.id} value={column.title}>
              {column.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

import React, { SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Column, Task } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { successToast } from "@/utils/successToast";
import { useBoard } from "@/hooks/useBoard";
import { errorToast } from "@/utils/errorToast";
import { updateTasks } from "@/services/taskServices";
import { Loader2 } from "lucide-react";
import { invalidateQuery } from "@/utils/invalidateQuery";

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
  const [isLoading, setIsLoading] = useState(false);
  const { board } = useBoard();

  const queryClient = useQueryClient();
  const isLocked = board?.isLocked;

  const handleChangeTaskColumn = async (id: string) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
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
      const res = await updateTasks(taskData);

      if (res?.status === 200) {
        await invalidateQuery(queryClient, "board");
        successToast("Task", "updated");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
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
    <Select disabled={isLoading} value={status} onValueChange={handleChange}>
      <SelectTrigger className="col-span-3 dark:bg-grey-dark input relative">
        <SelectValue placeholder={column.title} />
        {isLoading && (
          <Loader2 className="size-5 animate-spin absolute right-[2rem]" />
        )}
      </SelectTrigger>
      <SelectContent className="dark:bg-grey-darker input h-full">
        <SelectGroup>
          {columns?.map((column) => (
            <SelectItem
              key={column.id}
              value={column.title}
              className="cursor-pointer"
            >
              {column.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

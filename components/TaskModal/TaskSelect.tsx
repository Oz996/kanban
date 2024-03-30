import { Column, SubtaskInput } from "@/types";
import ButtonPrimary from "../ButtonPrimary";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React, { SetStateAction } from "react";

interface props {
  // column: Column;
  status: string;
  columns: Column[];
  addMode: boolean;
  subtasks: SubtaskInput[];
  setSubtasks: React.Dispatch<SetStateAction<SubtaskInput[]>>;
  setStatus: React.Dispatch<SetStateAction<string | undefined>>;
  setColumnId: React.Dispatch<SetStateAction<string | undefined>>;
}

const initState = {
  description: "",
  id: "",
  error: "",
  completed: false,
};

export default function TaskSelect({
  status,
  columns,
  addMode,
  subtasks,
  setSubtasks,
  setStatus,
  setColumnId,
}: props) {
  const handleAddSubtask = () => {
    const subtaskArray = [...subtasks];

    subtaskArray.push({
      description: "",
      id: "",
      error: "",
      completed: false,
    });
    setSubtasks(subtaskArray);
  };

  const handleChange = (value: string) => {
    setStatus(value);
    const selectedColumn = columns?.find((column) => column.title === value);
    if (selectedColumn) {
      setColumnId(selectedColumn.id);
    }
  };

  console.log("column123", status);
  console.log("columns321", columns);

  return (
    <Select value={status ?? columns?.[0].title} onValueChange={handleChange}>
      {subtasks.length < 7 && (
        <ButtonPrimary
          onClick={handleAddSubtask}
          type="button"
          size="sm"
          color="secondary"
        >
          + add new subtask
        </ButtonPrimary>
      )}
      <SelectTrigger className="col-span-3 bg-grey-dark input">
        <SelectValue placeholder={addMode ? "Status" : status} />
      </SelectTrigger>
      <SelectContent className="bg-grey-darker input h-full text-white">
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

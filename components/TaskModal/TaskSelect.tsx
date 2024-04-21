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
  setStatus,
  setColumnId,
}: props) {
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
      <SelectTrigger className="col-span-3 input">
        <SelectValue placeholder={addMode ? "Status" : status} />
      </SelectTrigger>
      <SelectContent className="input h-full">
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

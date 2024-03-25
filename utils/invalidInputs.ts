import { ColumnInput, SubtaskInput } from "@/types";
import React, { SetStateAction } from "react";

type ArrayType = ColumnInput | SubtaskInput;

// set value for each error property of input if its empty
export const invalidInputs = (
  type: "column" | "task",
  array: Array<ArrayType>,
  setState: React.Dispatch<SetStateAction<any[]>>
) => {
  const columnType = type === "column";

  const invalidInputs = columnType
    ? array.filter((item: any) => !item.title.trim())
    : array.filter((item: any) => !item.description.trim());

  console.log("invalidInputs", invalidInputs);
  if (invalidInputs.length > 0) {
    for (const item of invalidInputs) {
      item.error = "Can't be empty";
    }
    setState([...array]);
    return true;
  }
  return false;
};

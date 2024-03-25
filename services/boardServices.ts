import {
  deleteColumn,
  postBoard,
  postColumn,
  updateBoard,
  updateColumn,
} from "@/services/services";
import { Column, ColumnInput } from "@/types";
import { Inputs } from "../components/BoardModal/BoardForm";
import { SetStateAction } from "react";
import { invalidInputs } from "@/utils/invalidInputs";

interface ColumnProps {
  id?: string;
  columns: ColumnInput[];
  originalValues: Column[];
}

// posting a new board
export const createBoard = async (
  columns: ColumnInput[],
  data: Inputs,
  setColumns: React.Dispatch<SetStateAction<ColumnInput[]>>
) => {
  try {
    // set value for each error property of input if its empty
    const invalidColumns = columns.filter(
      (column: any) => !column.title.trim()
    );
    console.log("invalidColumns", invalidColumns);
    if (invalidColumns.length > 0) {
      for (const column of invalidColumns) {
        column.error = "Can't be empty";
      }
      setColumns([...columns]);
      return;
    }

    const { title } = data;
    const postData = {
      title,
      columns,
    };
    console.log("payload", postData);
    const res = await postBoard(postData);
    return res;
  } catch (error: any) {
    console.error(error.message);
  }
};

// update board title
export const updateBoardTitle = async (id: string, data: Inputs) => {
  try {
    await updateBoard(id, data);
  } catch (error: any) {
    console.error(error.message);
  }
};

// update existing columns
export const updateColumns = async (
  id: string,
  columns: ColumnInput[],
  originalValues: Column[],
  setColumns: React.Dispatch<SetStateAction<ColumnInput[]>>
) => {
  try {
    const invalid = invalidInputs("column", columns, setColumns);
    if (invalid) return;

    for (const originalColumn of originalValues!) {
      const existingColumn = columns.find(
        (column) => column.id === originalColumn.id
      );

      if (existingColumn) {
        const res = await updateColumn(id, existingColumn);
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

// delete removed columns
export const deleteColumns = async (
  columns: ColumnInput[],
  originalValues: Column[],
  setColumns: React.Dispatch<SetStateAction<ColumnInput[]>>
) => {
  try {
    const invalid = invalidInputs("column", columns, setColumns);
    if (invalid) return;

    for (const originalColumn of originalValues!) {
      const existingColumn = columns.find(
        (column) => column.id === originalColumn.id
      );

      if (!existingColumn) {
        console.log("existingColumn", originalColumn);
        await deleteColumn(originalColumn.id);
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

// post added columns
export const addColumns = async (
  id: string,
  columns: ColumnInput[],
  originalValues: Column[],
  setColumns: React.Dispatch<SetStateAction<ColumnInput[]>>
) => {
  try {
    const invalid = invalidInputs("column", columns, setColumns);
    if (invalid) return;

    for (const newColumn of columns) {
      const originalColumn = originalValues!.find(
        (column) => column.id === newColumn.id
      );

      if (!originalColumn) {
        console.log("add", newColumn);
        await postColumn(id, newColumn);
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

import { useBoard } from "@/hooks/useBoard";
import { ColumnInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonPrimary from "./ButtonPrimary";
import { invalidateQuery } from "@/lib/utils/invalidateQuery";
import BoardTitleInput from "./BoardTitleInput";
import BoardColumns from "./BoardColumns";
import { boardSchema } from "@/lib/schema";
import {
  addColumns,
  createBoard,
  deleteColumns,
  updateBoardTitle,
  updateColumns,
} from "@/services/boardServices";

interface props {
  type: "add" | "update";
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const initState: ColumnInput = {
  title: "",
  id: "",
  error: "",
};

export type Inputs = z.infer<typeof boardSchema>;

export default function BoardForm({ type, open, setOpen }: props) {
  // States and variables ---------------------------------
  const [columns, setColumns] = useState([initState]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(boardSchema),
  });

  const { board } = useBoard();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const addMode = type === "add";
  const updateMode = type === "update";

  const boardTitle = board?.title;
  const originalValues = board?.columns;
  // -----------------------------------------------------

  useEffect(() => {
    if (updateMode && board?.columns) {
      const mappedColumns: ColumnInput[] = board.columns.map((column) => ({
        title: column.title,
        id: column.id,
        error: "",
      }));
      setColumns(mappedColumns);
    }
  }, [updateMode, board?.columns, open]);

  console.log("column form", columns);

  const handleCreateBoard = async (data: Inputs) => {
    const status = await createBoard(columns, data, setColumns);
    if (status === 201) {
      invalidateQuery(queryClient, "boards");
      setOpen(false);
    }
  };

  const handleUpdateBoard = async (data: Inputs) => {
    const { title } = data;
    // update board title
    if (boardTitle !== title) {
      await updateBoardTitle(id as string, data);
    }
    // update existing columns
    await updateColumns(id as string, columns, originalValues!, setColumns);
    // delete removed columns
    await deleteColumns(columns, originalValues!, setColumns);
    // post added columns
    await addColumns(id as string, columns, originalValues!, setColumns);

    invalidateQuery(queryClient, "boards");
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpen((prev) => !prev);
    setColumns([
      {
        title: "",
        id: "",
        error: "",
      },
    ]);
    reset();
  };

  return (
    <form
      onSubmit={
        addMode
          ? handleSubmit(handleCreateBoard)
          : handleSubmit(handleUpdateBoard)
      }
      className="grid gap-4 py-4"
    >
      <BoardTitleInput
        register={register}
        updateMode={updateMode}
        boardTitle={boardTitle!}
        addMode={addMode}
        errors={errors}
      />
      <BoardColumns columns={columns} setColumns={setColumns} />

      <ButtonPrimary type="submit" size="sm" color="primary">
        {addMode ? "create new board" : updateMode ? "update board" : ""}
      </ButtonPrimary>
    </form>
  );
}

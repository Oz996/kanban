import { useBoard } from "@/hooks/useBoard";
import { boardSchema } from "@/lib/schema";
import { ColumnInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import ButtonPrimary from "../ButtonPrimary";
import {
  addColumns,
  createBoard,
  deleteColumns,
  updateBoardTitle,
  updateColumns,
} from "../../services/boardServices";
import { invalidateQuery } from "@/utils/invalidateQuery";
import BoardTitleInput from "./BoardTitleInput";
import BoardColumns from "./BoardColumns";
import { successToast } from "@/utils/successToast";
import { Loader2 } from "lucide-react";

interface props {
  type: "add" | "update";
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const createColumn = (): ColumnInput => ({
  title: "",
  id: "",
  error: "",
});
export type Inputs = z.infer<typeof boardSchema>;

export default function BoardForm({ type, open, setOpen }: props) {
  // States and variables ---------------------------------
  const [isLoading, setisLoading] = useState(false);
  const [columns, setColumns] = useState<ColumnInput[]>([
    {
      title: "",
      id: "",
      error: "",
    },
  ]);
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
  const router = useRouter();
  const queryClient = useQueryClient();

  const addMode = type === "add";
  const updateMode = type === "update";

  const boardTitle = board?.title;
  const originalValues = board?.columns;
  const isLocked = board?.isLocked;
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
    try {
      setisLoading(true);
      const res = await createBoard(columns, data, setColumns);
      if (res?.status === 201) {
        const newBoardId = res.data.id;
        await invalidateQuery(queryClient, "boards");
        setOpen(false);
        successToast("Board", "created");
        router.push(newBoardId);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setisLoading(false);
    }
  };

  const handleUpdateBoard = async (data: Inputs) => {
    try {
      setisLoading(true);
      const { title } = data;
      if (boardTitle !== title) {
        await updateBoardTitle(id as string, data);
      }
      await updateColumns(id as string, columns, originalValues!, setColumns);
      await deleteColumns(columns, originalValues!, setColumns);
      await addColumns(id as string, columns, originalValues!, setColumns);

      const columnErrors = Object.values(columns).some((value) => value.error);
      if (columnErrors) return;

      await invalidateQuery(queryClient, "boards");
      setOpen(false);
      successToast("Board", "updated");
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
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

      <ButtonPrimary
        disabled={(isLocked && updateMode) || isLoading}
        type="submit"
        size="sm"
        color="primary"
      >
        {isLoading && <Loader2 className="mr-1 size-5 animate-spin" />}
        {addMode ? "create new board" : updateMode ? "update board" : ""}
      </ButtonPrimary>
    </form>
  );
}

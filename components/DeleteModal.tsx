"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { useParams, useRouter } from "next/navigation";
import ButtonPrimary from "./ButtonPrimary";
import { useQueryClient } from "@tanstack/react-query";
import { useBoard } from "@/hooks/useBoard";
import { deleteBoard, deleteTask } from "@/services/services";
import { Task } from "@/types";
import { successToast } from "@/utils/successToast";
import { Loader2 } from "lucide-react";
import { invalidateQuery } from "@/utils/invalidateQuery";

interface props {
  type: "board" | "column" | "task";
  trigger: React.ReactNode;
  task?: Task;
}

export default function DeleteModal({ type, trigger, task }: props) {
  const { board } = useBoard();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { id } = useParams();
  const router = useRouter();

  const invalidateBoard = () => {
    invalidateQuery(queryClient, "board");
    setOpen(false);
  };

  // handling board deletion
  const boardType = type === "board";

  const handleDeleteBoard = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteBoard(id);
      invalidateBoard();
      successToast("Board", "deleted");
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // handling task deletion
  const handlDeleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteTask(id);
      invalidateBoard();
      successToast("Task", "deleted");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletion = async (id: string) => {
    if (boardType) {
      await handleDeleteBoard(id);
    } else {
      handlDeleteTask(task!.id);
    }
  };

  const description = boardType
    ? `Are you sure you want to delete the ‘${board?.title}’ board? This action will remove all columns and tasks and cannot be reversed.`
    : `Are you sure you want to delete the ‘${task?.title}’ task and its subtasks? This action cannot be reversed.`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="space-y-4 p-8 bg-darkGrey border-none text-mediumGrey">
        <DialogTitle className="heading-lg text-danger">
          Delete this {type}?
        </DialogTitle>
        <DialogHeader className="body-lg">{description}</DialogHeader>
        <DialogFooter className="flex flex-col gap-4 justify-between md:flex-row md:gap-0">
          <ButtonPrimary
            disabled={isLoading}
            size="sm"
            color="danger"
            className="w-full"
            onClick={() => handleDeletion(id as string)}
          >
            {isLoading && <Loader2 className="mr-1 size-5 animate-spin" />}
            delete
          </ButtonPrimary>
          <ButtonPrimary
            size="sm"
            color="secondary"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            cancel
          </ButtonPrimary>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

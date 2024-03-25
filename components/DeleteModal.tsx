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
import { useParams } from "next/navigation";
import ButtonPrimary from "./ButtonPrimary";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useBoard } from "@/hooks/useBoard";
import { deleteBoard, deleteTask } from "@/services/services";
import { Task } from "@/types";
import { successToast } from "@/utils/successToast";

interface props {
  type: "board" | "column" | "task";
  trigger: React.ReactNode;
  task?: Task;
}

export default function DeleteModal({ type, trigger, task }: props) {
  const { board } = useBoard();
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { id } = useParams();

  const invalidateBoard = () => {
    queryClient.invalidateQueries(["board"] as InvalidateQueryFilters);
    setOpen(false);
  };

  // handling board deletion
  const boardType = type === "board";

  const handleDeleteBoard = async (id: string) => {
    await deleteBoard(id);
    invalidateBoard();
    successToast("Board", "deleted");
  };

  // handling task deletion
  const handlDeleteTask = async (id: string) => {
    await deleteTask(id);
    invalidateBoard();
    successToast("Task", "deleted");
  };

  const handleDeletion = (id: string) => {
    if (boardType) {
      handleDeleteBoard(id);
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
            size="sm"
            color="danger"
            className="w-full"
            onClick={() => handleDeletion(id as string)}
          >
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

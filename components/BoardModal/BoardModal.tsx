"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import BoardForm from "./BoardForm";
import { useState } from "react";
import { ModalProps } from "@/types";

export default function BoardModal({ type, trigger }: ModalProps) {
  const [open, setOpen] = useState(false);

  const addMode = type === "add";
  const updateMode = type === "update";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-darkGrey text-white max-h-[100vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold capitalize">
            {addMode ? "add new board" : "edit board"}
          </DialogTitle>
        </DialogHeader>
        <BoardForm type={type} open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

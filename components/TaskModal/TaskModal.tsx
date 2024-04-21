import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { ModalProps } from "@/types";

import TaskForm from "./TaskForm";

export default function TaskModal({
  type,
  trigger,
  column,
  columns,
  task,
}: ModalProps) {
  const [open, setOpen] = useState(false);

  const addMode = type === "add";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[100vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold capitalize">
            {addMode ? "add new task" : "edit task"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          type={type}
          column={column}
          columns={columns}
          task={task}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

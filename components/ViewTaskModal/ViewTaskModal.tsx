import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ModalProps, Subtask } from "@/types";
import ViewTaskSelect from "./ViewTaskSelect";
import TaskDropdown from "./TaskDropdown";
import ViewTaskSubtasks from "./ViewTaskSubtasks";

export default function ViewTaskModal({
  trigger,
  task,
  columns,
  column,
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const subtasks: Subtask[] = task!.subtasks;

  console.log("task", task);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-grey-dark text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex justify-between items-center">
            {task?.title}
            <TaskDropdown column={column!} columns={columns!} task={task!} />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="heading-md text-grey-medium mb-8">
          {task?.description ? task.description : "No description"}
        </DialogDescription>
        <ViewTaskSubtasks subtasks={subtasks} />
        <div className="flex flex-col gap-2">
          <span className="heading-sm capitalize">current status</span>
          <ViewTaskSelect
            column={column!}
            columns={columns!}
            setStatus={setStatus}
            status={status}
            task={task!}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

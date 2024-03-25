import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import dots from "@/assets/icon-vertical-ellipsis.svg";
import { Column, ModalProps, Subtask, Task } from "@/types";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { getBaseUrl } from "@/lib/URL";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import TaskModal from "./TaskModal";
import DeleteModal from "./DeleteModal";

export default function ViewTaskModal({
  trigger,
  task,
  columns,
  column,
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [columnId, setColumnId] = useState("");
  const subtasks: Subtask[] = task!.subtasks;

  console.log("taskk", task);

  const completed = subtasks.filter((subtask) => subtask.completed);

  const queryClient = useQueryClient();

  const handleSubtaskCompleted = async (subtask: Subtask) => {
    try {
      // we check if completed value is falsy or truthy and set it to the opposite
      const newCompletedStatus = !subtask.completed;
      const data = {
        completed: newCompletedStatus,
        id: subtask.id,
      };
      console.log("payload", data);

      const res = await axios.put(
        getBaseUrl() + `/api/subtask/${subtask.id}`,
        data
      );
      console.log("put res", res);
      if (res.status === 200) {
        queryClient.invalidateQueries(["board"] as InvalidateQueryFilters);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleChangeTaskColumn = async (id: string) => {
    try {
      const { title, description, status, subtasks } = task!;

      const taskData = {
        title,
        description,
        status,
        subtasks,
        columnId: id,
      };
      console.log("payload", taskData);
      const res = await axios.put(
        getBaseUrl() + `/api/task/${task?.id}`,
        taskData
      );
      queryClient.invalidateQueries(["board"] as InvalidateQueryFilters);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  console.log("id id", columnId);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-darkGrey border-none text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex justify-between items-center">
            {task?.title}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  className="cursor-pointer hover:opacity-60 duration-200"
                  width={5}
                  height={5}
                  src={dots}
                  alt="Three dots lined vertically"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[12rem] bg-veryDarkGrey text-white border-none mr-8 mt-5 py-3">
                <div className="flex flex-col gap-3 pl-3">
                  {/* temporary solution */}
                  <DropdownMenuItem
                    asChild
                    className="text-md capitalize text-mediumGrey hover:opacity-60 duration-200 cursor-pointer"
                  >
                    <TaskModal
                      type="update"
                      task={task}
                      columns={columns}
                      column={column}
                      trigger={
                        <span className="pl-3 text-md capitalize text-mediumGrey hover:opacity-60 duration-200 cursor-pointer">
                          edit task
                        </span>
                      }
                    ></TaskModal>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DeleteModal
                      type="task"
                      task={task}
                      trigger={
                        <span className="pl-3 text-md capitalize text-danger hover:opacity-60 duration-200 cursor-pointer">
                          delete task
                        </span>
                      }
                    ></DeleteModal>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="heading-md text-mediumGrey mb-8">
          {task?.description}
        </DialogDescription>
        <div className="flex flex-col gap-3 mb-3">
          <span className="heading-sm">
            Subtasks ({completed.length} of {subtasks.length})
          </span>
          {subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="bg-veryDarkGrey p-3 rounded flex gap-3 items-center cursor-pointer hover:bg-mainPurple hover:bg-opacity-60 duration-200"
              onClick={() => handleSubtaskCompleted(subtask)}
            >
              <Checkbox
                onCheckedChange={() => handleSubtaskCompleted(subtask)}
                checked={subtask.completed}
                id={subtask.id}
              />
              <Label
                htmlFor={subtask.id}
                className={classNames({
                  "heading-sm text-white cursor-pointer": true,
                  "line-through text-opacity-60": subtask.completed,
                })}
              >
                {subtask.description}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="heading-sm capitalize">current status</span>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              const selectedColumn = columns?.find(
                (column) => column.title === value
              );
              if (selectedColumn) {
                const id = selectedColumn.id;
                setColumnId(id);
                handleChangeTaskColumn(id);
              }
            }}
          >
            <SelectTrigger className="col-span-3 bg-darkGrey input">
              <SelectValue placeholder={column?.title} />
            </SelectTrigger>
            <SelectContent className="bg-darkGrey input h-full text-white">
              <SelectGroup>
                {columns?.map((column) => (
                  <SelectItem key={column.id} value={column.title}>
                    {column.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}

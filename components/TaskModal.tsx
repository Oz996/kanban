import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { getBaseUrl } from "@/lib/URL";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Column, ModalProps, SubtaskInput, Task } from "@/types";
import ButtonPrimary from "./ButtonPrimary";
import classNames from "classnames";
import DynamicInput from "./DynamicInput";
import { z } from "zod";
import { taskSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTask, updateTask } from "./taskService";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

const initState = {
  description: "",
  id: "",
  error: "",
  completed: false,
};

type Inputs = z.infer<typeof taskSchema>;

export default function TaskModal({
  type,
  trigger,
  column,
  columns,
  task,
}: ModalProps) {
  console.log("columnss", columns?.[0].title);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(column?.title);
  const [columnId, setColumnId] = useState(column?.id);
  const [subtasks, setSubtasks] = useState([initState]);

  const addMode = type === "add";
  const updateMode = type === "update";
  const queryClient = useQueryClient();

  // if we are adding a new task set the default column to the first column of the board
  useEffect(() => {
    if (columns) {
      setStatus(columns[0].title);
      setColumnId(columns[0].id);
    }
  }, [columns]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(taskSchema),
  });

  console.log("status", status);
  console.log("columnId", columnId);

  useEffect(() => {
    if (updateMode && task?.subtasks) {
      const mappedColumns: SubtaskInput[] = task.subtasks.map((subtask) => ({
        description: subtask.description,
        id: subtask.id,
        error: "",
        completed: subtask.completed,
      }));
      setSubtasks(mappedColumns);
    }
  }, [updateMode, task?.subtasks, open]);

  const invalidateBoard = () => {
    queryClient.invalidateQueries(["board"] as InvalidateQueryFilters);
    setOpen(false);
  };

  const handlePostTask = async (data: FieldValues) => {
    await postTask({ subtasks, setSubtasks, status, columnId, data });
    invalidateBoard();
  };

  const handleUpdateTask = async (data: FieldValues) => {
    await updateTask({ subtasks, status, columnId, data, task });
    invalidateBoard();
  };

  const handleRemoveSubtask = (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const handleAddSubtask = () => {
    const subtaskArray = [...subtasks];

    subtaskArray.push(initState);
    setSubtasks(subtaskArray);
  };

  console.log("subtasks", subtasks);
  console.log("columnId", columnId);

  console.log("initState", initState);

  const closeModal = () => {
    setOpen((prev) => !prev);
    setSubtasks([
      {
        description: "",
        id: "",
        error: "",
        completed: false,
      },
    ]);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-darkGrey border-none text-white capitalize">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {addMode ? "add new task" : updateMode ? "edit task" : ""}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={
            addMode
              ? handleSubmit(handlePostTask)
              : updateMode
              ? handleSubmit(handleUpdateTask)
              : undefined
          }
          className="grid gap-4 py-4"
        >
          <div className="flex flex-col gap-4">
            <Label htmlFor="title" className="text-left heading-sm capitalize">
              title
            </Label>
            <Input
              {...register("title")}
              defaultValue={task?.title}
              placeholder={addMode ? "e.g. Take coffee break" : ""}
              id="title"
              className={classNames({
                "col-span-3 bg-darkGrey input relative": true,
                "border-danger focus-within:border-danger":
                  errors?.title?.message,
              })}
            />
            {errors?.title?.message && (
              <p className="body-lg text-danger absolute right-12 top-[7.7rem]">
                {errors.title.message}
              </p>
            )}
            <Label htmlFor="title" className="text-left heading-sm capitalize">
              description
            </Label>
            <Textarea
              {...register("description")}
              defaultValue={task?.description}
              placeholder={
                addMode
                  ? "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                  : ""
              }
              className={classNames({
                "col-span-3 bg-darkGrey input relative resize-none h-[7rem]":
                  true,
                "border-danger focus-within:border-danger":
                  errors?.description?.message,
              })}
            />
            {errors?.description?.message && (
              <p className="body-lg text-danger absolute right-12 top-[17.5rem]">
                {errors.description.message}
              </p>
            )}
            {subtasks.map((subtask, index) => (
              <div
                key={index}
                className={classNames({
                  "relative flex gap-3 items-center": true,
                  "border-danger focus-within:border-danger":
                    errors?.description?.message,
                })}
              >
                <Input
                  id="subtasks"
                  className={classNames({
                    "col-span-3 bg-darkGrey input": true,
                    "border-danger focus-within:border-danger": subtask.error,
                  })}
                  value={subtask.description}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    const updatedSubtask = {
                      ...subtasks[index],
                      description: newTitle,
                      error: "",
                      completed: false,
                    };
                    const newSubtasks = [...subtasks];
                    newSubtasks[index] = updatedSubtask;
                    setSubtasks(newSubtasks);
                  }}
                ></Input>
                {subtasks.length > 1 && (
                  <DynamicInput
                    handleRemove={handleRemoveSubtask}
                    index={index}
                    error={subtask.error}
                  />
                )}
                <p
                  className={classNames({
                    "body-lg text-red-400 absolute": true,
                    "right-14": subtasks.length > 1,
                    "right-6": subtasks.length === 1,
                  })}
                >
                  {subtask.error}
                </p>
              </div>
            ))}
            <Select
              value={column?.title ?? columns?.[0].title}
              onValueChange={(value) => {
                setStatus(value);
                const selectedColumn = columns?.find(
                  (column) => column.title === value
                );
                if (selectedColumn) {
                  setColumnId(selectedColumn.id);
                }
              }}
            >
              {subtasks.length < 7 && (
                <ButtonPrimary
                  onClick={handleAddSubtask}
                  type="button"
                  size="sm"
                  color="secondary"
                >
                  + add new subtask
                </ButtonPrimary>
              )}
              <SelectTrigger className="col-span-3 bg-darkGrey input">
                <SelectValue placeholder={addMode ? "Status" : column?.title} />
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
          <DialogFooter>
            <div className="w-full flex flex-col">
              <ButtonPrimary type="submit" size="sm" color="primary">
                {addMode ? "create task" : "edit task"}
              </ButtonPrimary>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

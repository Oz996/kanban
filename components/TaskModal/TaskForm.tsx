import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/schema";
import {
  createTask,
  postSubtask,
  updateTask,
} from "../../services/taskServices";
import { successToast } from "@/utils/successToast";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useEffect, useState } from "react";
import ButtonPrimary from "../ButtonPrimary";
import { Column, SubtaskInput, Task } from "@/types";
import { z } from "zod";
import TaskTitleInput from "./TaskTitleInput";
import TaskDescription from "./TaskDescription";
import TaskSubtasks from "./TaskSubtasks";
import TaskSelect from "./TaskSelect";
import { useBoard } from "@/hooks/useBoard";
import { Loader2 } from "lucide-react";

const initState = {
  description: "",
  id: "",
  error: "",
  completed: false,
};

interface props {
  type: "add" | "update";
  task?: Task;
  column?: Column;
  columns?: Column[];
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

type Inputs = z.infer<typeof taskSchema>;

export default function TaskForm({
  column,
  type,
  columns,
  task,
  setOpen,
}: props) {
  // States and variables ---------------------------------
  const [status, setStatus] = useState(column?.title);
  const [columnId, setColumnId] = useState(column?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [subtasks, setSubtasks] = useState<SubtaskInput[]>([
    {
      description: "",
      id: "",
      error: "",
      completed: false,
    },
  ]);

  const addMode = type === "add";
  const updateMode = type === "update";

  const queryClient = useQueryClient();
  const { board } = useBoard();

  const isLocked = board?.isLocked;
  const originalValues = task?.subtasks;
  // -----------------------------------------------------

  // if we are adding a new task set the default column to the first column of the board
  useEffect(() => {
    if (!column) {
      setStatus(columns![0].title);
      setColumnId(columns![0].id);
    }
  }, [column, columns]);

  // set and display values of current subtasks if editing a task
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
  }, [updateMode, task?.subtasks]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(taskSchema),
  });

  const invalidateBoard = () => {
    queryClient.invalidateQueries(["board"] as InvalidateQueryFilters);
    setOpen(false);
  };

  const handlePostTask = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const taskStatus = await createTask({
        subtasks,
        setSubtasks,
        status,
        columnId,
        data,
      });
      if (taskStatus === 201) {
        invalidateBoard();
        successToast("Task", "created");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const taskStatus = await updateTask({
        subtasks,
        status,
        setSubtasks,
        columnId,
        data,
        task,
      });
      await postSubtask(task!.id, subtasks, originalValues!);
      if (taskStatus === 200) {
        invalidateBoard();
        successToast("Task", "updated");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <TaskTitleInput
          register={register}
          addMode={addMode}
          task={task!}
          errors={errors}
        />
        <TaskDescription
          register={register}
          addMode={addMode}
          task={task!}
          errors={errors}
        />

        <TaskSubtasks subtasks={subtasks} setSubtasks={setSubtasks} />

        <TaskSelect
          // column={column!}
          status={status!}
          columns={columns!}
          addMode={addMode}
          setColumnId={setColumnId}
          setStatus={setStatus}
          setSubtasks={setSubtasks}
          subtasks={subtasks}
        />
      </div>

      <div className="w-full flex flex-col">
        <ButtonPrimary
          disabled={isLocked || isLoading}
          type="submit"
          size="sm"
          color="primary"
        >
          {isLoading && <Loader2 className="mr-1 size-5 animate-spin" />}
          {addMode ? "create task" : "edit task"}
        </ButtonPrimary>
      </div>
    </form>
  );
}

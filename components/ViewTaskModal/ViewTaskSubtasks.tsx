import { Subtask } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import classNames from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import { updateSubtask } from "@/services/services";
import { useBoard } from "@/hooks/useBoard";
import { errorToast } from "@/utils/errorToast";
import { useState } from "react";
import { Loader } from "lucide-react";
import { invalidateQuery } from "@/utils/invalidateQuery";

interface props {
  subtasks: Subtask[];
}

const initState = {
  id: "",
  loading: false,
};
export default function ViewTaskSubtasks({ subtasks }: props) {
  const [isLoading, setIsLoading] = useState(initState);
  const queryClient = useQueryClient();
  const { board } = useBoard();

  const completed = subtasks.filter((subtask) => subtask.completed);
  const isLocked = board?.isLocked;

  console.log("loading ?", isLoading.loading);

  const handleSubtaskCompleted = async (subtask: Subtask) => {
    if (isLocked) return errorToast("edit");
    if (isLoading.loading) return;
    try {
      console.log("ran");
      setIsLoading({
        id: subtask.id,
        loading: true,
      });
      // we check if completed value is falsy or truthy and set it to the opposite
      const newCompletedStatus = !subtask.completed;
      const data = {
        completed: newCompletedStatus,
      };
      console.log("payload", data);
      const res = await updateSubtask(subtask.id, data);

      if (res.status === 200) {
        await invalidateQuery(queryClient, "board");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(initState);
    }
  };

  return (
    <div className="flex flex-col gap-3 mb-3">
      <span className="heading-sm">
        Subtasks ({completed.length} of {subtasks.length})
      </span>
      {subtasks.map((subtask) => (
        <div
          key={subtask.id}
          className={classNames({
            "relative bg-veryDarkGrey p-3 rounded flex gap-3 items-center cursor-pointer hover:bg-mainPurple hover:bg-opacity-60 duration-200":
              true,
            "opacity-60": isLoading.id === subtask.id,
          })}
          onClick={() => handleSubtaskCompleted(subtask)}
        >
          <Checkbox checked={subtask.completed} id={subtask.id} />
          <Label
            htmlFor={subtask.id}
            className={classNames({
              "heading-sm text-white cursor-pointer": true,
              "line-through text-opacity-60": subtask.completed,
            })}
          >
            {subtask.description}
          </Label>
          {isLoading.id === subtask.id && (
            <Loader className="animate-spin absolute right-[1rem] size-5" />
          )}
        </div>
      ))}
    </div>
  );
}

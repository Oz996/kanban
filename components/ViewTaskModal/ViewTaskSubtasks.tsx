import { Subtask } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import classNames from "classnames";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { updateSubtask } from "@/services/services";
import { useBoard } from "@/hooks/useBoard";
import { errorToast } from "@/utils/errorToast";

interface props {
  subtasks: Subtask[];
}

export default function ViewTaskSubtasks({ subtasks }: props) {
  const queryClient = useQueryClient();
  const { board } = useBoard();

  const completed = subtasks.filter((subtask) => subtask.completed);
  const isLocked = board?.isLocked;

  const handleSubtaskCompleted = async (subtask: Subtask) => {
    try {
      if (isLocked) return errorToast("edit");
      // we check if completed value is falsy or truthy and set it to the opposite
      const newCompletedStatus = !subtask.completed;
      const data = {
        completed: newCompletedStatus,
      };
      console.log("payload", data);
      const status = await updateSubtask(subtask.id, data);

      if (status === 200) {
        queryClient.invalidateQueries(["board"] as InvalidateQueryFilters);
      }
    } catch (error: any) {
      console.error(error.message);
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
          className="bg-veryDarkGrey p-3 rounded flex gap-3 items-center cursor-pointer hover:bg-mainPurple hover:bg-opacity-60 duration-200"
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
        </div>
      ))}
    </div>
  );
}

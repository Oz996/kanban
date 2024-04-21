import { SubtaskInput } from "@/types";
import classNames from "classnames";
import React, { ChangeEvent, SetStateAction } from "react";
import { Input } from "../ui/input";
import DynamicInput from "../DynamicInput";
import { Label } from "../ui/label";

interface props {
  subtasks: SubtaskInput[];
  setSubtasks: React.Dispatch<SetStateAction<SubtaskInput[]>>;
}

export default function TaskSubtasks({ subtasks, setSubtasks }: props) {
  const handleRemoveSubtask = (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
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
  };

  console.log("subtasks", subtasks);
  return (
    <>
      <Label htmlFor="subtasks" className="heading-sm capitalize">
        subtasks
      </Label>
      {subtasks.map((subtask, index) => (
        <div
          key={index}
          className={classNames({
            "relative flex gap-3 items-center": true,
            "border-danger-medium focus-within:border-danger-medium":
              subtask.error,
          })}
        >
          <Input
            id="subtasks"
            className={classNames({
              "col-span-3 input": true,
              "border-danger-medium focus-within:border-danger-medium":
                subtask.error,
            })}
            value={subtask.description}
            onChange={(e) => handleChange(e, index)}
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
    </>
  );
}

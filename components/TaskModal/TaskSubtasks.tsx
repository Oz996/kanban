import { SubtaskInput } from "@/types";
import classNames from "classnames";
import React, { ChangeEvent, SetStateAction } from "react";
import { Input } from "../ui/input";
import DynamicInput from "../DynamicInput";
import { Label } from "../ui/label";
import ButtonPrimary from "../ButtonPrimary";

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

  const handleAddSubtask = () => {
    const subtaskArray = [...subtasks];

    subtaskArray.push({
      description: "",
      id: "",
      error: "",
      completed: false,
    });
    setSubtasks(subtaskArray);
  };

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
          {subtasks.length > 0 && (
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
    </>
  );
}

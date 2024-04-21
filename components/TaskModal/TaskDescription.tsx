import classNames from "classnames";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Task } from "@/types";

interface props {
  register: UseFormRegister<{ title: string; description: string }>;
  task: Task;
  addMode: boolean;
  errors: FieldErrors<{ title: string; description: string }>;
}

export default function TaskDescription({
  register,
  task,
  addMode,
  errors,
}: props) {
  return (
    <>
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
          "col-span-3 input relative resize-none h-[7rem]": true,
          "border-danger-medium focus-within:border-danger-medium":
            errors?.description?.message,
        })}
      />
      {errors?.description?.message && (
        <p className="body-lg text-danger-medium absolute right-12 top-[18rem]">
          {errors.description.message}
        </p>
      )}
    </>
  );
}

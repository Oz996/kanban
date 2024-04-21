import classNames from "classnames";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Task } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface props {
  register: UseFormRegister<{ title: string; description: string }>;
  task: Task;
  addMode: boolean;
  errors: FieldErrors<{ title: string; description: string }>;
}

export default function TaskTitleInput({
  register,
  task,
  addMode,
  errors,
}: props) {
  return (
    <>
      <Label htmlFor="title" className="text-left heading-sm capitalize">
        title
      </Label>
      <Input
        {...register("title")}
        defaultValue={task?.title}
        placeholder={addMode ? "e.g. Take coffee break" : ""}
        id="title"
        className={classNames({
          "col-span-3 input relative": true,
          "border-danger-medium focus-within:border-danger-medium":
            errors?.title?.message,
        })}
      />
      {errors?.title?.message && (
        <p className="body-lg text-danger-medium absolute right-12 top-[8.2rem]">
          {errors.title.message}
        </p>
      )}
    </>
  );
}

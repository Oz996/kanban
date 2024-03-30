import classNames from "classnames";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface props {
  register: UseFormRegister<{ title: string }>;
  updateMode: boolean;
  boardTitle: string;
  addMode: boolean;
  errors: FieldErrors<{ title: string }>;
}

export default function BoardTitleInput({
  register,
  updateMode,
  boardTitle,
  addMode,
  errors,
}: props) {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="title" className="text-left heading-sm capitalize">
        board name
      </Label>
      <Input
        aria-describedby="titleError"
        {...register("title")}
        id="title"
        defaultValue={updateMode ? boardTitle : undefined}
        placeholder={addMode ? "e.g. Web Design" : ""}
        className={classNames({
          "col-span-3 bg-grey-dark input relative": true,
          "border-danger-medium focus-within:border-danger-medium":
            errors?.title?.message,
        })}
      />
      {errors?.title?.message && (
        <p
          id="titleError"
          className="body-lg text-danger-medium border-danger-medium absolute right-12 top-[8.2rem]"
        >
          {errors?.title?.message}
        </p>
      )}
    </div>
  );
}

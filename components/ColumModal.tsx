"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Cross from "@/assets/icon-cross.svg";
import { FieldValues, useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import ButtonPrimary from "./ButtonPrimary";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

interface props {
  id?: string;
  type: "add" | "update";
  trigger: React.ReactElement;
}

export default function ColumnModal({ id, type, trigger }: props) {
  // const initState = [
  //   {
  //     id: crypto.randomUUID(),
  //   },
  // ];
  // const [inputs, setInputs] = useState(initState);
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState([{ title: "" }]);

  // const newInput = () => {
  //   const input = {
  //     id: crypto.randomUUID(),
  //   };
  //   const newInputs = [...inputs, input];
  //   setInputs(newInputs);
  // };

  // const removeInput = (id: string) => {
  //   const newInputs = inputs.filter((input) => input.id !== id);
  //   setInputs(newInputs);
  // };

  const addColumn = type === "add";

  // console.log(inputs);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "titles",
  });

  const watchs = watch("titles");
  // console.log("titles", watchs);

  const queryClient = useQueryClient();

  const postColumn = async (e: any) => {
    console.log("clicked");
    try {
      e.preventDefault();
      await Promise.all(
        columns.map(async (title: any) => {
          const dataObject = {
            title: title.title,
            id,
          };
          console.log("payload", dataObject);
          const res = await axios.post(
            getBaseUrl() + `/api/column`,
            dataObject
          );
          console.log("Response", res);
        })
      );
      console.log("All requests completed");
      queryClient.invalidateQueries(["boards"] as InvalidateQueryFilters);
      setOpen(false);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  console.log("columns", columns);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-darkGrey border-none text-white capitalize">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {addColumn ? "add new colum" : "edit column"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={postColumn} className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left heading-sm capitalize">
              title
            </Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-center">
                <Input
                  {...register(`titles.${index}.title`)}
                  id="title"
                  className="col-span-3 bg-darkGrey input"
                  onChange={(e) => {
                    const newColumns = [...columns];
                    newColumns[index] = { title: e.target.value };
                    setColumns(newColumns);
                  }}
                />
                {fields.length > 1 && (
                  <Image
                    onClick={() => remove(index)}
                    className="cursor-pointer"
                    src={Cross}
                    height={15}
                    width={15}
                    alt="Cross icon"
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <div className="flex flex-col gap-2 w-full">
              {fields.length < 5 && (
                <ButtonPrimary
                  onClick={() => append({ title: "" })}
                  type="button"
                  size="sm"
                  color="secondary"
                >
                  + add new colum
                </ButtonPrimary>
              )}
              <ButtonPrimary type="submit" size="sm" color="primary">
                create new column
              </ButtonPrimary>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

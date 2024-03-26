import { z } from "zod";

export const boardSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(431, { message: "Title is too long" }),
});

export const columnSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title is too long" }),
});

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(431, { message: "Title is too long" }),
  description: z.string().max(600, { message: "Description is too long" }),
});

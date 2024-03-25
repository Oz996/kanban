import { toast } from "sonner";

type Type = "Board" | "Task";
type Event = "created" | "updated" | "deleted";

export const successToast = (type: Type, event: Event) => {
  toast.success(`${type} has been ${event}`);
};

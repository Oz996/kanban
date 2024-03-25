import { toast } from "sonner";

type Event = "delete" | "edit";

export const errorToast = (event: Event) => {
  toast.error(`Cannot ${event} Example Board`);
};

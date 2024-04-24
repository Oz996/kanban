import { ButtonProps } from "@/types";
import { Button } from "./ui/button";
import classnames from "classnames";

export default function ButtonPrimary({
  children,
  size,
  color,
  className,
  ...props
}: ButtonProps) {
  const primary = color === "primary";
  const secondary = color === "secondary";
  const danger = color === "danger";

  return (
    <Button
      {...props}
      className={classnames({
        [className!]: className,
        "rounded-full capitalize font-bold duration-200 text-white": true,
        "h-[3rem]": size === "lg",
        "h-[2.5rem]": size === "sm",
        "bg-purple-medium hover:bg-purple-light": primary,
        "bg-purple-medium bg-opacity-10 text-purple-medium hover:bg-slate-200 dark:bg-white dark:hover:opacity-80":
          secondary,
        "bg-danger-medium hover:bg-danger-light": danger,
      })}
    >
      {children}
    </Button>
  );
}

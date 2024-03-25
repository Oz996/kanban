import { ButtonProps } from "@/types";
import { Button } from "./ui/button";
import classnames from "classnames";

export default function ButtonPrimary({
  children,
  className,
  size,
  color,
  type,
  onClick,
}: ButtonProps) {
  const primary = color === "primary";
  const secondary = color === "secondary";
  const danger = color === "danger";

  return (
    <Button
      onClick={onClick}
      type={type}
      className={classnames({
        [className!]: className,
        "rounded-full capitalize font-bold duration-200": true,
        "h-[3rem]": size === "lg",
        "h-[2.5rem]": size === "sm",
        "bg-mainPurple hover:bg-secondaryPurple": primary,
        "bg-white text-mainPurple hover:bg-slate-200": secondary,
        "bg-danger hover:bg-dangerHover": danger,
      })}
    >
      {children}
    </Button>
  );
}

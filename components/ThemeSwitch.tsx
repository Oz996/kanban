import Image from "next/image";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import Moon from "@/assets/icon-dark-theme.svg";
import Sun from "@/assets/icon-light-theme.svg";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };

  return (
    <div className="flex gap-3 items-center justify-center bg-lines-light dark:bg-grey-darker rounded-lg p-3 mx-5">
      <Image src={Sun} width={18} height={18} alt="" />
      <Switch
        id="theme"
        checked={theme === "dark"}
        onCheckedChange={handleToggleTheme}
      >
        <Label htmlFor="theme" className="sr-only">
          Theme
        </Label>
      </Switch>
      <Image src={Moon} width={16} height={16} alt="" />
    </div>
  );
}

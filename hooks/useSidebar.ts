import { SidebarContext } from "@/context/SidebarContext";
import { useContext } from "react";

export const useSidebar = () => {
  const sideBar = useContext(SidebarContext);
  if (!sideBar) throw Error("Failed to use SidebarContext");
  return sideBar;
};

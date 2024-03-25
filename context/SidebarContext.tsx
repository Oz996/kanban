"use client";

import { ReactNode, SetStateAction, createContext, useState } from "react";

interface SidebarContext {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContext | null>(null);

export const SideBarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

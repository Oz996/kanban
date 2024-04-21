"use client";

import { BoardContextProvider } from "@/context/BoardContext";
import { SideBarContextProvider } from "@/context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SideBarContextProvider>
        <BoardContextProvider>
          <main className={`${theme} bg-grey-light dark:bg-grey-darker`}>
            {children}
          </main>
        </BoardContextProvider>
      </SideBarContextProvider>
      <ReactQueryDevtools />
      <Toaster richColors />
    </QueryClientProvider>
  );
}

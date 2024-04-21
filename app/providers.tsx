"use client";

import { BoardContextProvider } from "@/context/BoardContext";
import { SideBarContextProvider } from "@/context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={client}>
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

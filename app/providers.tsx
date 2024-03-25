"use client";

import { BoardContextProvider } from "@/context/BoardContext";
import { SideBarContextProvider } from "@/context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <SideBarContextProvider>
        <BoardContextProvider>{children}</BoardContextProvider>
      </SideBarContextProvider>
      <ReactQueryDevtools />
      <Toaster richColors />
    </QueryClientProvider>
  );
}

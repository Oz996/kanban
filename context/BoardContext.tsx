"use client";

import { Board, Column } from "@/types";
import { ReactNode, SetStateAction, createContext, useState } from "react";

interface BoardContext {
  board: Board | undefined;
  setBoard: React.Dispatch<SetStateAction<Board | undefined>>;
}

export const BoardContext = createContext<BoardContext | null>(null);

export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<Board>();
  console.log("context", board);
  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

import { BoardContext } from "@/context/BoardContext";
import { useContext } from "react";

export const useBoard = () => {
  const board = useContext(BoardContext);
  if (!board) throw Error("Failed to use BoardContext");
  return board;
};

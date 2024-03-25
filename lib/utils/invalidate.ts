import { queryClient } from "@/app/board/queryClient";
import { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";

export const invalidateBoard = () => {
  queryClient.invalidateQueries(["board"] as InvalidateQueryFilters);
};

export const invalidateBoards = () => {
  queryClient.invalidateQueries(["boards"] as InvalidateQueryFilters);
};

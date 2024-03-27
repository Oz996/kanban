import { InvalidateQueryFilters } from "@tanstack/react-query";

export const invalidateQuery = (
  queryClient: any,
  query: "boards" | "board"
) => {
  queryClient.invalidateQueries([query] as InvalidateQueryFilters);
};

import { InvalidateQueryFilters } from "@tanstack/react-query";

export const invalidateQuery = async (
  queryClient: any,
  query: "boards" | "board"
) => {
  return queryClient.invalidateQueries([query] as InvalidateQueryFilters);
};

import { InvalidateQueryFilters } from "@tanstack/react-query";

export const invalidateQuery = async (
  queryClient: any,
  query: "boards" | "board"
) => {
  console.log("invalidating...");
  return queryClient.invalidateQueries([query] as InvalidateQueryFilters);
};

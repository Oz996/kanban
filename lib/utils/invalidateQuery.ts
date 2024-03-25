import { InvalidateQueryFilters } from "@tanstack/react-query";

export const invalidateQuery = (queryClient: any, query: string) => {
  queryClient.invalidateQueries([query] as InvalidateQueryFilters);
};

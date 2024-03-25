import { getBoards } from "@/services/services";
import { useQuery } from "@tanstack/react-query";

export const useFetchBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });
};

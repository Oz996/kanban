import { getBoard } from "@/services/services";
import { useQuery } from "@tanstack/react-query";

interface props {
  params: { id: string };
}
export const useFetchBoard = ({ params }: props) => {
  return useQuery({
    queryKey: ["board"],
    queryFn: () => getBoard(params.id),
  });
};

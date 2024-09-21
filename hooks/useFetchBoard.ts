import { getBoard } from "@/services/services";
import { useQuery } from "@tanstack/react-query";

interface props {
  params: { id: string };
}
export const useFetchBoard = ({ params }: props) => {
  return useQuery({
    queryKey: ["board", params.id],
    queryFn: () => getBoard(params.id),
  });
};

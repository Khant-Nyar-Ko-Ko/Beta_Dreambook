import { createHistory, fetchHistory } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostHistory = () =>
  useMutation({
    mutationFn: (data: { bookSlug: string }) => createHistory(data),
  });


export const useFetchHistory = (sort?: string, title?: string | undefined) => {
    return useQuery({
        queryKey: ["history",sort, title],
        queryFn: () => fetchHistory({sort, title}),
        staleTime: 10 * 60 * 1000,
      });
}
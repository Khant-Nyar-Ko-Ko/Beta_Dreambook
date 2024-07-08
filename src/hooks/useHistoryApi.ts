import { createHistory, fetchHistory } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostHistory = () =>
  useMutation({
    mutationFn: (data: { bookSlug: string }) => createHistory(data),
  });


export const useFetchHistory = () => {
    return useQuery({
        queryKey: ["history"],
        queryFn: () => fetchHistory(),
        staleTime: 10 * 60 * 1000,
      });
}
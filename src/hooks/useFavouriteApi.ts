import { addFavourite, fetchFavourite, removeFavourite } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchFavourite = (sort? : string) =>
  useQuery({
    queryKey: ["favourite", sort],
    queryFn: () => fetchFavourite({sort}),
  });

export const useAddFavourite = () =>
  useMutation({
    mutationFn: (bookId: number) => addFavourite({ bookId }),
  });

export const useRemoveFavourite = () =>
  useMutation({
    mutationFn: (bookId: number) => removeFavourite({ bookId }),
  });

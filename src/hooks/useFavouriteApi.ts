import { addFavourite, fetchFavourite, removeFavourite } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddFavourite = () =>
  useMutation({
    mutationFn: (bookId: number) => addFavourite({ bookId }),
  });

export const useFetchFavourite = () =>
  useQuery({
    queryKey: ["favourite"],
    queryFn: () => fetchFavourite(),
  });

export const useRemoveFavourite = () =>
  useMutation({
    mutationFn: (id : number) => removeFavourite({id})
  })

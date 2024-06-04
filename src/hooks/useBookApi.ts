import { createBooks, fetchBooks } from "@/api";
import { Book } from "@/utils/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchBooks = () =>
  useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

export const useCreateBook = () => {
  return useMutation({
    mutationFn: createBooks
  });
};

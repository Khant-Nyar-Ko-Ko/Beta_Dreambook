import { createBooks, fetchBooks } from "@/api";
import { BookDataType } from "@/utils/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateBook = () => {
  return useMutation({
    mutationFn: (data: BookDataType) => createBooks( data ),
  });
};

export const useFetchBooks = () => useQuery({
  queryKey: ['books'],
  queryFn: () => fetchBooks()
})
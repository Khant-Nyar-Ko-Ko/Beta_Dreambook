import { createBooks, fetchBooks, fetchPopularBook, fetchSingleBook } from "@/api";
import { BookDataType } from "@/utils/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateBook = () => {
  return useMutation({
    mutationFn: (data: BookDataType) => createBooks(data),
  });
};

export const useFetchBooks = (page? : number) => useQuery({
  queryKey: ['books', page],
  queryFn: () => fetchBooks(page),
  staleTime: 5 * 60 * 1000,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetchSingleBook = (id : any) => useQuery({
  queryKey: ['singleBook',id],
  queryFn: () => fetchSingleBook({id}), 
  enabled: !!id
})


export const useFetchPopularBook = () => {
  return useQuery({
    queryKey: ['popular'],
    queryFn: () => fetchPopularBook(),
    staleTime: 10 * 60 * 1000,
  })
}
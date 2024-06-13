import { createBooks, fetchBooks, fetchPaginatedBooks, fetchPopularBook, fetchSingleBook } from "@/api";
import { BookDataType } from "@/utils/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateBook = () => {
  return useMutation({
    mutationFn: (data: BookDataType) => createBooks(data),
  });
};

export const useFetchBooks = () => useQuery({
  queryKey: ['books'],
  queryFn: () => fetchBooks()
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetchSingleBook = (id : any) => useQuery({
  queryKey: ['singleBook'],
  queryFn: () => fetchSingleBook({id})
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetchPaginatedBooks = (page: any) => {
  return useQuery({
    queryKey: ['paginatedBooks', page],
    queryFn: () => fetchPaginatedBooks(page),
  });
};

export const useFetchPopularBook = () => {
  return useQuery({
    queryKey: ['popular'],
    queryFn: () => fetchPopularBook()
  })
}
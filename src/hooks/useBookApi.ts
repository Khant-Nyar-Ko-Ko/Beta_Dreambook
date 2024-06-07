import { createBooks, fetchBooks, fetchPaginatedBooks } from "@/api";
import { BookDataType } from "@/utils/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useCreateBook = () => {
  return useMutation({
    mutationFn: (data: BookDataType) => createBooks( data ),
  });
};

export const useFetchBooks = () => useQuery({
  queryKey: ['books'],
  queryFn: () => fetchBooks()
})

export const useFetchPaginatedBooks = () => {
  const {currentPage} = useParams();
  const pageNumber = currentPage ?  parseInt(currentPage) : 1;
  return useQuery({
    queryKey: ['paginatedBooks', pageNumber], 
    queryFn: () => fetchPaginatedBooks(pageNumber as number)
  });
};
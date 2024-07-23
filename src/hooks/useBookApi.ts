/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createBooks,
  deleteBook,
  fetchBooks,
  fetchBooksByLoginUser,
  fetchPopularBook,
  fetchRecommendedBook,
  fetchRelatedBooks,
  fetchSingleBook,
  updateBook,
} from "@/api";
import { BookDataType } from "@/utils/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchBooks = (
  page?: number,
  title?: string,
  categoryId?: string[] | null,
  sort?: string,
  author? : string
) =>
  useQuery({
    queryKey: ["books", page, title, categoryId, sort, author],
    queryFn: () => fetchBooks(page, title, categoryId, sort, author),
    staleTime: 5 * 60 * 1000,
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetchSingleBook = (slug: string) =>
  useQuery({
    queryKey: ["singleBook", slug],
    queryFn: () => fetchSingleBook( {slug} ),
    enabled: !!slug,
  });

export const useFetchPopularBook = () => {
  return useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchPopularBook(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useFetchRecommendedBook = () => {
  return useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchRecommendedBook(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useFetchBooksByLoginUser = (sort?: string, title?: string | undefined) => {
  return useQuery({
    queryKey: ["loginUserBooks",sort, title],
    queryFn: () => fetchBooksByLoginUser({sort, title}),
    staleTime: 10 * 60 * 1000
  })
}

export const useFetchRelatedBooks = (slug : string) => {
  return useQuery({
    queryKey: ["relatedBooks", slug],
    queryFn: () => fetchRelatedBooks({slug})
  })
}

export const useCreateBook = () => {
  return useMutation({
    mutationFn: (data: BookDataType) => createBooks(data),
  });
};

export const useUpdateBook = () => {
  return useMutation({
    mutationFn: (data: BookDataType) => updateBook(data)
  })
}

export const useDeleteBook = () => {
 return useMutation({
  mutationFn: (slug : string) => deleteBook({slug})
 })
} 
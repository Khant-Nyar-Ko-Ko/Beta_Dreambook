/* eslint-disable @typescript-eslint/no-explicit-any */
import { getComment, postComment } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostComment = () => {
  return useMutation({
    mutationFn: ({ bookId, text }: { bookId: number; text: string }) =>
      postComment({ bookId, text }),
  });
};

export const useGetComment = (slug : string) => useQuery({
  queryKey: ['comment', slug],
  queryFn: () => getComment({slug})
})
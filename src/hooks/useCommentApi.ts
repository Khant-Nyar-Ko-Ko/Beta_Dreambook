/* eslint-disable @typescript-eslint/no-explicit-any */
import { getComment, postComment } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostComment = () => {
  return useMutation({
    mutationFn: ({ bookSlug, text }: { bookSlug: string; text: string }) =>
      postComment({ bookSlug, text }),
  });
};

export const useGetComment = (slug : string) => useQuery({
  queryKey: ['comment', slug],
  queryFn: () => getComment({slug})
})
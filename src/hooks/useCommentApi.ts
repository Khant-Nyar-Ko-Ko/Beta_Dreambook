/* eslint-disable @typescript-eslint/no-explicit-any */
import { countReply, getComment, getReply, postComment, replyComment } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostComment = () => {
  return useMutation({
    mutationFn: ({ bookSlug, text }: { bookSlug: string; text: string }) =>
      postComment({ bookSlug, text }),
  });
};

export const useReplyComment = () => {
  return useMutation({
    mutationFn: ({ parentId, text }: { parentId: number; text: string }) =>
      replyComment({ parentId, text }),
  });
};

export const useGetComment = (slug: string) =>
  useQuery({
    queryKey: ["comment", slug],
    queryFn: () => getComment({ slug }),
  });

export const useGetReply = (parentId : number) =>
  useQuery({
    queryKey: ["reply",parentId],
    queryFn: () => getReply({parentId})
  }) 

export const useCountReply = (parentId : number) => 
  useQuery({
    queryKey: ["count-reply", parentId],
    queryFn: () => countReply({parentId})
  })
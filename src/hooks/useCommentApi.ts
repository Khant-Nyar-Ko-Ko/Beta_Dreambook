import { postComment } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const usePostComment = () => {
  return useMutation({
    mutationFn: ({ bookId, text }: { bookId: number; text: string }) =>
      postComment({ bookId, text }),
  });
};

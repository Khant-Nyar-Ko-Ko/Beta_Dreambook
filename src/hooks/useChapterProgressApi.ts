import { getChapterProgress, postChapterProgress } from "@/api";
import { ChapterProgressType } from "@/utils/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostChapterProgress = () =>
  useMutation({
    mutationFn: (data: ChapterProgressType) => postChapterProgress(data),
  });

export const useGetChapterProgress = (bookId: number) => {
  return useQuery({
    queryKey: ["chapterProgress", bookId],
    queryFn: () => getChapterProgress({ bookId }),
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createChapter, getChapter, updateChapter } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

interface ChapterData {
    title: string;
    content: string;
    slug: string;
    priority: number,
    status: boolean,
  }

export const useGetChapter = ({slug} : {slug : string}) => useQuery({
    queryKey: ['chapters',slug],
    queryFn: () => getChapter({slug})
})

export const useCreateChapter = () => {
    return useMutation({
        mutationFn: (data : ChapterData) => createChapter( data),
    })
}

export const useUpdateChapter = () => {
    return useMutation({
        mutationFn: (data : ChapterData) => updateChapter(data)
    })
}
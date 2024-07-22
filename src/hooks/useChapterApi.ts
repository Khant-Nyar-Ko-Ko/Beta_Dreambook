/* eslint-disable @typescript-eslint/no-explicit-any */
import { createChapter, deleteChapter, getChapter, updateChapter } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CreateChapterData {
    title: string;
    content: string;
    slug: string;
    priority: number,
    status: boolean,
  }

  interface EditChapterData {
    id: number;
    title: string;
    content: string;
    chapterNum: number;
    priority: number,
    status: boolean,
  }

export const useGetChapter = ({slug} : {slug : string}) => useQuery({
    queryKey: ['chapters',slug],
    queryFn: () => getChapter({slug})
})

export const useCreateChapter = () => {
    return useMutation({
        mutationFn: (data : CreateChapterData) => createChapter( data),
    })
}

export const useUpdateChapter = () => {
    return useMutation({
        mutationFn: (data : EditChapterData) => updateChapter(data)
    })
}

export const useDeleteChapter = () => {
    return useMutation({
        mutationFn: (id : number) => deleteChapter({id})
       })
}
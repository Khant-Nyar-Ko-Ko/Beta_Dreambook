/* eslint-disable @typescript-eslint/no-explicit-any */
import { createChapter, getChapter } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetChapter = ({slug} : {slug : string}) => useQuery({
    queryKey: ['chapters',slug],
    queryFn: () => getChapter({slug})
})

export const useCreateChapter = () => {
    return useMutation({
        mutationFn: ({ slug }: { slug: string }) => createChapter({ slug }),
    })
}
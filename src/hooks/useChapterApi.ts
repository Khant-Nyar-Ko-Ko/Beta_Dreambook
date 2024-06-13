/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChapter } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetChapter = ({bookId} : {bookId : string}) => useQuery({
    queryKey: ['chapters',bookId],
    queryFn: () => getChapter({bookId})
})
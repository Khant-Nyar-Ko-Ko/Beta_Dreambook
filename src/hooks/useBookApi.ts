import { fetchBooks } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchBooks = () => useQuery({
    queryKey: ["books"],
    queryFn: () => fetchBooks()
})
import { fetchCategories } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = () => useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories()
})
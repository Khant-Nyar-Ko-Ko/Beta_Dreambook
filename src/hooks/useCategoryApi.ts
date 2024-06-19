import { fetchCategories, fetchTrendingCategories } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = () => useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories()
})

export const useFetchTrendingCategories = () => useQuery({
    queryKey: ["trendingCategories"],
    queryFn: () => fetchTrendingCategories()
})
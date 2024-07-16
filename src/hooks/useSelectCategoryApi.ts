import { selectCategory } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useSelectCategory = () => useMutation({
    mutationFn: (categoryIds : number[]) => selectCategory({categoryIds})
});

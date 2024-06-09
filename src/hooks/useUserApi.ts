import { fetchUserProfile } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const useUserApi = (token : string) => useQuery({
    queryKey: ['me'],
    queryFn: () => fetchUserProfile(token)
})
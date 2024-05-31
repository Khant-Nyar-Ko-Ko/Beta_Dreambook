import { BaseURL } from "@/service/ApiEndpoints"

export const fetchBooks  = async () => {
    const response : Response = await fetch(`${BaseURL}/books`);
    const result = await response.json();
    if(!response.ok){
        throw new Error(result.message);
    }
    return result;
}
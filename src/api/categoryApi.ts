import { BaseURL } from "@/service/ApiEndpoints"
import { categoryType } from "@/utils/type";

export const fetchCategories = async () => {
    const response :Response = await fetch(`${BaseURL}/categories`, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
      });
    const result = await response.json();
    if(!response.ok){
        throw new Error(result.message);
    }
    return result as categoryType
}

export const fetchTrendingCategories = async () => {
    const response : Response = await fetch(`${BaseURL}/categories/popularCategories`, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
      });
    const result = await response.json();
    if(!response.ok){
        throw new Error(result?.message);
    }
    return result;
}
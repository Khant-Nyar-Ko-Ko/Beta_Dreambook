import { BaseURL } from "@/service/ApiEndpoints"
import { categoryType } from "@/utils/type";
// import { categoryType } from "@/utils/type";

export const fetchCategories = async () => {
    const response :Response = await fetch(`${BaseURL}/categories`);
    const result = await response.json();
    if(!response.ok){
        throw new Error(result.message);
    }
    return result as categoryType
}
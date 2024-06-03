import { BaseURL } from "@/service/ApiEndpoints"
import { Book } from "@/utils/type";

export const fetchBooks  = async () => {
    const response : Response = await fetch(`${BaseURL}/books`);
    const result = await response.json();
    if(!response.ok){
        throw new Error(result.message);
    }
    return result;
    
}

export const createBooks = async (data : Book): Promise<Book> => {
    const formData = new FormData();
    formData.append("title",data.title);
    formData.append("description",data.description);
    formData.append("slug", data.slug);
    formData.append("keyword",data.keywords[0]);
    formData.append("coverImg",data.coverImg);
    const response : Response = await fetch(`${BaseURL}/books`,{
        method: 'POST',
        body: formData
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }

    return response.json();
}
import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService"
import { HistoryType } from "@/utils/type";

export const createHistory = async ({
    data,
  }: {
    data: {
      userId: number;
      bookId: number;
    };
  }): Promise<HistoryType> => {
    const token = getToken();
    const response : Response = await fetch(`${BaseURL}/history`,{
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        mode: "cors",
        redirect: "follow",
        body: JSON.stringify(data)
    })
    

    const result = await response.json();
    if(!response.ok){
        throw new Error();
    }
    return result;
}

export const fetchHistory = async () => {
    const token = getToken();
    const response : Response = await fetch(`${BaseURL}/history`,{
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        mode: "cors",
        redirect: "follow"
    })

    const result = await response.json();
    if(!response.ok){
        throw new Error();
    }
    return result;
}
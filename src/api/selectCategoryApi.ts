import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";

export const selectCategory = async ({categoryId} : {categoryId: number}) => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/interested-category`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: 'POST',
    mode: "cors",
    body: JSON.stringify(categoryId)
  });

  const result = await response.json();
  if(!response.ok){
    throw new Error
  }
  return result
};

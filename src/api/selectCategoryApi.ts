import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";

export const selectCategory = async ({categoryIds} : {categoryIds: number[]}) => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/interested-category`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: 'POST',
    mode: "cors",
    body: JSON.stringify({ categoryIds })
  });

  const result = await response.json();
  if(!response.ok){
    const errorResponse = await response.json();
    throw new Error(`Server error: ${errorResponse.message}`);
  }
  return result
};

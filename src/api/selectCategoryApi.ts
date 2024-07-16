import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
const token = getToken();

export const selectCategory = async ({categoryIds} : {categoryIds: number[]}) => {

  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  
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

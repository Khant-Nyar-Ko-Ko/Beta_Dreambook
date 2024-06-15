import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";

export const postComment = async ({
  bookId,
  text,
}: {
  bookId: number;
  text: string;
}) => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ bookId, text }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};

export const getComment = async ({ bookId }: { bookId: number }) => {
  const token = getToken();
  const response : Response = await fetch(`${BaseURL}/comments/book/${bookId}`,{
    headers: {
      Authorization : `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept : 'application/json'
    },
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  });

  const result = await response.json();
  if(!response.ok){
    throw new Error
  }
  return result;
};

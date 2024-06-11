import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";

export const addFavourite = async ({ bookId }: { bookId: number }) => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/favourites`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    body: JSON.stringify({ bookId }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }

  return result;
};

export const fetchFavourite = async () => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/favourites/user`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    mode: "cors",
    redirect: "follow",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};

export const removeFavourite = async({id} : {id : number}) => {
  const token = getToken();

  const response : Response = await fetch(`${BaseURL}/favourites/${id}`,{
    headers: {
      Accept : "application/json",
      "Content-type" : "application/json",
      Authorization : `Bearer ${token}`,
    },
    method: 'DELETE',
    mode: "cors",
    redirect: "follow",
  })

  const result = await response.json();
  if(!response.ok){
    throw new Error();
  }

  return result;
}

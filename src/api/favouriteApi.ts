import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
const token = getToken();

export const fetchFavourite = async ({
  sort,
  title,
}: {
  sort?: string;
  title?: string | undefined;}) => {
  let queryString = "";
  if (sort) {
    queryString += (queryString ? "&" : "?") + `sort=${sort}`;
  }
  if (title) {
    queryString +=
      (queryString ? "&" : "?") + `title=${encodeURIComponent(title)}`;
  }
  const response: Response = await fetch(`${BaseURL}/books/favourite${queryString}`, {
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

export const addFavourite = async ({ bookId }: { bookId: number }) => {
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

export const removeFavourite = async ({ bookId }: { bookId: number }) => {

  const response: Response = await fetch(`${BaseURL}/favourites/${bookId}`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
    mode: "cors",
    redirect: "follow",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }

  return result;
};

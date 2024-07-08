import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";

export const createHistory = async ({ bookSlug }: { bookSlug: string }) => {
  const token = getToken();
  const data = { bookSlug };

  const response: Response = await fetch(`${BaseURL}/history`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json'
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};


export const fetchHistory = async () => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/history`, {
    headers: {
      Accept: "application/json",
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

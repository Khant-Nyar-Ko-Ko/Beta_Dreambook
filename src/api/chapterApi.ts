/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";

export const getChapter = async ({ slug }: { slug: string }) => {
  const token = getToken();
  const queryString = `?slug=${slug}`;
  const response: Response = await fetch(`${BaseURL}/chapters/books${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    mode: "cors",
    redirect: "follow",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
  }
  return result;
};

export const createChapter = async ({slug} : {slug: string}) => {
  const token = getToken();
  const queryString = `?slug=${slug}`;
  const response : Response = await fetch(`${BaseURL}/chapters${queryString}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
  })

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
  }
  return result;
}
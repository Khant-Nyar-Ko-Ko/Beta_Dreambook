/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
const token = getToken();


export const getChapter = async ({ slug }: { slug: string }) => {
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

export const createChapter = async (data: { title: string, content: string, slug: string,  priority: number,
  status: boolean }) => {
  const { title, content, slug, priority, status } = data;

  console.log('Sending request to:', `${BaseURL}/chapters?slug=${slug}`);
  console.log('Request body:', { title, content });

  try {
    const response: Response = await fetch(`${BaseURL}/chapters?slug=${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      redirect: "follow",
      body: JSON.stringify({ title, content,  priority, status}),
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }

    return result;
  } catch (error) {
    console.error('Error during createChapter:', error);
    throw error;
  }
};

export const updateChapter = async (data : {title: string, content: string, chapterNum: number, priority: number, status: boolean}) => {
  const { title, content, chapterNum, priority, status } = data;

  const response: Response = await fetch(`${BaseURL}/chapters/${chapterNum}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    mode: "cors",
    redirect: "follow",
    body: JSON.stringify({ title, content,  priority, status}),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
  }

  return result;
}

export const deleteChapter = async ({id} : {id : number}) => {
  const response : Response = await fetch(`${BaseURL}/chapters/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    mode: "cors",
    redirect: "follow",
  })

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
  }

  return result;
}

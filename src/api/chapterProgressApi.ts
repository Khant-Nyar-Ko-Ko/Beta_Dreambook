import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
import { ChapterProgressType } from "@/utils/type";
const token = getToken();

export const postChapterProgress = async (data: ChapterProgressType) => {
  const queryString = `?slug=${data.slug}`;
  const response: Response = await fetch(`${BaseURL}/chapter-progress${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
  }
  return result;
};

export const getChapterProgress = async ({ slug }: { slug: string }) => {
  const queryString = `?slug=${slug}`;
  const response: Response = await fetch(
    `${BaseURL}/chapter-progress${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "cors",
      redirect: "follow",
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
  }
  return result;
};

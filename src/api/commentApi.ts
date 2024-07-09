import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";

export const postComment = async ({
  bookSlug,
  text,
}: {
  bookSlug: string;
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
    body: JSON.stringify({ bookSlug, text }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};

export const replyComment = async ({
  parentId,
  text,
}: {
  parentId: number;
  text: string;
}) => {
  const token = getToken();
  const queryString = `?parentId=${parentId}`;
  const response: Response = await fetch(
    `${BaseURL}/comments/reply${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      mode: "cors",
      redirect: "follow",
      body: JSON.stringify({ text }),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};

export const getComment = async ({ slug }: { slug: string }) => {
  const token = getToken();
  const response: Response = await fetch(
    `${BaseURL}/comments/book?slug=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
      mode: "cors",
      redirect: "follow",
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};

export const getReply = async ({ parentId }: { parentId: number }) => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/comments/${parentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
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

export const countReply = async ({ parentId }: { parentId: number }) => {
  const token = getToken();
  const response: Response = await fetch(
    `${BaseURL}/comments/count/${parentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
      mode: "cors",
      redirect: "follow",
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};

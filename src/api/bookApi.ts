import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
import { BookDataType } from "@/utils/type";

export const fetchBooks = async (page?: number, title?: string) => {
  const token = getToken();
  let queryString = "";
  if (page) {
    queryString += `?page=${page}`;
  }
  if (title) {
    queryString +=
      (queryString ? "&" : "?") + `title=${encodeURIComponent(title)}`;
  }
  const response: Response = await fetch(`${BaseURL}/books${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    mode: "cors",
    redirect: "follow",
  });

  const result = response.json();

  if (!response.ok) {
    throw new Error();
  }

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchSingleBook = async ({ id }: { id: any }) => {
  console.log("fetchSingleBook - Received ID:", id); // Debug to see the ID
  if (!id) {
    console.error("Invalid book ID");
    throw new Error("Invalid book ID");
  }
  const response: Response = await fetch(`${BaseURL}/books/${id}`, {
    method: "GET",
    mode: "cors",
    redirect: "follow",
  });

  const result = await response.json();
  if (!response.ok) {
    console.error("HTTP error when fetching book:", response.statusText);
    throw new Error(response.statusText);
  }
  return result;
};

export const fetchPopularBook = async () => {
  const response: Response = await fetch(`${BaseURL}/books/popular/popular`, {
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

export const createBooks = async (
  data: BookDataType
): Promise<BookDataType> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("coverImg", data.coverImg);
  formData.append("description", data.description);
  data.keywords.forEach((keyword) => formData.append("keyword[]", keyword));
  formData.append("status", data.status);
  formData.append("categoryId", data.categoryId);

  const response: Response = await fetch(`${BaseURL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "POST",
    redirect: "follow",
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return result;
};

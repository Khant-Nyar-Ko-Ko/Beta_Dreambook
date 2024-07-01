/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
import { BookDataType } from "@/utils/type";

export const fetchBooks = async (
  page?: number,
  title?: string,
  categoryIds?: string[] | null,
  sort?: string
) => {
  let queryString = "";
  if (page) {
    queryString += `?page=${page}`;
  }
  if (title) {
    queryString +=
      (queryString ? "&" : "?") + `title=${encodeURIComponent(title)}`;
  }
  if (categoryIds) {
    const encodedCategoryIds = encodeURIComponent(JSON.stringify(categoryIds));
    queryString +=
      (queryString ? "&" : "?") + `categoryIds=${encodedCategoryIds}`;
  }

  if (sort) {
    queryString += (queryString ? "&" : "?") + `sort=${sort}`;
  }
  const response: Response = await fetch(`${BaseURL}/books${queryString}`, {
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

export const fetchSingleBook = async ({ slug }: { slug: string }) => {
  if (!slug) {
    console.error("Invalid book ID");
    throw new Error("Invalid book ID");
  }
  const response: Response = await fetch(`${BaseURL}/books/searchBook/${slug}`, {
    method: "GET",
    mode: "cors",
    redirect: "follow",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return result;
};

export const fetchPopularBook = async () => {
  const response: Response = await fetch(`${BaseURL}/books/popular`, {
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

export const fetchBooksByLoginUser = async (sort?: string) => {
  let queryString = "";
  if (sort) {
    queryString += (queryString ? "&" : "?") + `sort=${sort}`;
  }
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/books/user${queryString}`, {
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

export const fetchRelatedBooks = async ({ slug }: { slug: string }) => {
  const queryString = `?slug=${slug}`;
  const response: Response = await fetch(
    `${BaseURL}/books/related${queryString}`,
    {
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

export const createBooks = async (
  data: BookDataType
): Promise<BookDataType> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("coverImg", data.coverImg);
  formData.append("description", data.description);
  data.keywords.forEach((keyword) => {
    formData.append("keywords[]", keyword);
  });
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

export const updateBook = async (
  data : BookDataType
) => {
  const token = getToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("coverImg", data.coverImg);
  formData.append("description", data.description);
  data.keywords.forEach((keyword) => formData.append("keyword[]", keyword));
  formData.append("status", data.status);
  formData.append("categoryId", data.categoryId);

  const response : Response = await fetch(`${BaseURL}/books/${data.slug}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "PATCH",
    redirect: "follow",
    body: formData,
  })

  const result = await response.json();
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return result;
}

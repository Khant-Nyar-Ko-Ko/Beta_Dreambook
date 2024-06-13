import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
import { BookDataType } from "@/utils/type";

export const fetchBooks = async () => {
  const response: Response = await fetch(`${BaseURL}/books`, {
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
  const response: Response = await fetch(`${BaseURL}/books/${id}`, {
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

export const fetchPaginatedBooks = async (currentPage: number) => {
  const filterPage = currentPage ? `?page=${currentPage}` : "";
  const response: Response = await fetch(`${BaseURL}/books${filterPage}`, {
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

export const fetchPopularBook = async () => {
  const response : Response = await fetch(`${BaseURL}/books/popular/popular`,{
    method: 'GET',
    mode: "cors",
    redirect: "follow"
  })

  const result = await response.json();
  if(!response.ok){
    throw new Error
  }
  return result
}

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

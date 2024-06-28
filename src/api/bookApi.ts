import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
import { BookDataType, BookResponseType } from "@/utils/type";

export const fetchBooks = async () => {
<<<<<<< HEAD
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

=======
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
>>>>>>> 99a3ad8 (commit)
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  console.log(result);
  return result;
};

<<<<<<< HEAD
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
=======
export const createBooks = async (
  data: BookDataType
): Promise<BookResponseType> => {
>>>>>>> 99a3ad8 (commit)
  const token = getToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("coverImg", data.coverImg);
  formData.append("description", data.description);
<<<<<<< HEAD
  data.keywords.forEach((keyword) => formData.append("keyword[]", keyword));
=======
  data.keywords.forEach((keyword) => formData.append("keywords[]", keyword));
>>>>>>> 99a3ad8 (commit)
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

  console.log(response);

  const result = await response.json();
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  console.log(result);
  return result;
};
<<<<<<< HEAD
=======

export const getSingleBook = async (bookId: string) => {
  const token = getToken();
  const response: Response = await fetch(
    `${BaseURL}/books/searchBook/${bookId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      mode: "cors",
      redirect: "follow",
    }
  );

  console.log(response);

  if (!response.ok) {
    throw new Error("network response is not ok");
  }

  const result = await response.json();
  console.log(result);
  return result;
};

export const updateBook = async (
  data: BookDataType,
  bookId: string
): Promise<BookResponseType> => {
  const token = getToken();
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("coverImg", data.coverImg);
  formData.append("description", data.description);
  formData.append("status", data.status);
  formData.append("categoryId", data.categoryId);
  data.keywords.forEach((keyword) => formData.append("keywords[]", keyword));

  const response: Response = await fetch(`${BaseURL}/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "PATCH",
    redirect: "follow",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error("response has some errors");
  }

  console.log(result);
  return result;
};

export const deleteBook = async (bookId: number) => {
  const token = getToken();

  const response: Response = await fetch(`${BaseURL}/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    redirect: "follow",
    method: "DELETE",
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error("response is not good");
  }
  console.log(result);
  return result;
};
>>>>>>> 99a3ad8 (commit)

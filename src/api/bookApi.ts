/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
import { BookDataType } from "@/utils/type";

export const fetchBooks = async (
  page?: number,
  title?: string,
  categoryIds?: string[] | null,
  sort?: string,
  author?: string
) => {
  const token = getToken();
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
  if (author) {
    queryString += (queryString ? "&" : "?") + `author=${author}`;
  }
  const response: Response = await fetch(`${BaseURL}/books${queryString}`, {
    method: "GET",
    mode: "cors",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to fetch books');
  }

  return response.json();
};

export const fetchSingleBook = async ({ slug }: { slug: string }) => {
  const token = getToken();
  try {
    const response: Response = await fetch(
      `${BaseURL}/books/searchBook/${slug}`,
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
      console.error("Server Error:", response.statusText);
      throw new Error(response.statusText);
    }
    return result;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export const fetchPopularBook = async () => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/books/popular`, {
    method: "GET",
    mode: "cors",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to fetch popular books');
  }

  return response.json();
};

export const fetchRecommendedBook = async () => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/books/recommended`, {
    method: "GET",
    mode: "cors",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to fetch recommended books');
  }

  return response.json();
};

export const fetchBooksByLoginUser = async ({
  sort,
  title,
}: {
  sort?: string;
  title?: string | undefined;
}) => {
  const token = getToken();
  let queryString = "";
  if (sort) {
    queryString += (queryString ? "&" : "?") + `sort=${sort}`;
  }
  if (title) {
    queryString +=
      (queryString ? "&" : "?") + `title=${encodeURIComponent(title)}`;
  }
  const response: Response = await fetch(
    `${BaseURL}/books/user${queryString}`,
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

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to fetch user books');
  }

  return response.json();
};

export const fetchRelatedBooks = async ({ slug }: { slug: string }) => {
  const token = getToken();
  const queryString = `?slug=${slug}`;
  const response: Response = await fetch(
    `${BaseURL}/books/related${queryString}`,
    {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to fetch related books');
  }

  return response.json();
};

export const createBooks = async (data: BookDataType): Promise<BookDataType> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token available');
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("coverImg", data.coverImg);
    formData.append("description", data.description);
    formData.append("keywords", JSON.stringify(data.keywords));
    formData.append("status", JSON.stringify(data.status));
    formData.append("categoryId", data.categoryId);

    const response: Response = await fetch(`${BaseURL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to create book');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};



export const updateBook = async (data: BookDataType) => {
  const token = getToken();
  const formData = new FormData();
  formData.append("title", data.title);
  if (data.coverImg instanceof File) {
    formData.append("coverImg", data.coverImg);
  }
  formData.append("description", data.description);
  formData.append("keywords", JSON.stringify(data.keywords));
  formData.append("status", JSON.stringify(data.status));
  formData.append("categoryId", data.categoryId);

  const response: Response = await fetch(`${BaseURL}/books?slug=${data.slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "PATCH",
    redirect: "follow",
    body: formData,
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to update book');
  }

  return response.json();
};

export const deleteBook = async ({ slug }: { slug: string }) => {
  const token = getToken();
  const queryString = `?slug=${slug}`;

  try {
    const response: Response = await fetch(`${BaseURL}/books${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "DELETE",
      mode: "cors",
      redirect: "follow",
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Delete book failed:", errorResponse);
      throw new Error(errorResponse.message || "Failed to delete book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in deleteBook function:", error);
    throw error;
  }
};

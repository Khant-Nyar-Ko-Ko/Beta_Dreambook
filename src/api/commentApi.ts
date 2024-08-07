import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";
const token = getToken();


export const postComment = async ({
  bookSlug,
  text,
}: {
  bookSlug: string;
  text: string;
}) => {
  
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

export const getComment = async ({ slug, page }: { slug: string, page : number }) => {
  let queryString = "";
  if(slug){
    queryString +=
    (queryString ? "&" : "?") + `slug=${slug}`;
  }
  if(page){
    queryString += 
    (queryString ? "&" : "?") + `page=${page}`
  }
  
  const response: Response = await fetch(
    `${BaseURL}/comments/book${queryString}`,
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
    throw new Error(result.message);
  }

  return {
    items: result.items,
    hasMore: result.items.length > 0,
  };
};

export const getReply = async ({ parentId }: { parentId: number }) => {
  
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

export const deleteComment = async ({id} : {id : number}) => {
  const response : Response = await fetch(`${BaseURL}/comments/${id}`,{
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


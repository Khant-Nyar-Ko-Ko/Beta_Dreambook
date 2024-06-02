import { BaseURL } from "@/service/ApiEndpoints";
import { login , getToken } from "@/service/authService";
import { signinDataType, signupDataType } from "@/utils/type";

// Sign Up User Function
export const signUpUser = async ({
  data,
}: {
  data: {
    email : string,
    access_token? : string
    password: string;
  };
}): Promise<signupDataType> => {
  const response: Response = await fetch(`${BaseURL}/auth/signup`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  const token = result.access_token;

  if (response.ok) {
    login(token);
  } else {
    throw new Error(result.message);
  }

  return result as signupDataType;
};

// Sign In User Function
export const signInUser = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}): Promise<signinDataType> => {
  const response: Response = await fetch(`${BaseURL}/auth/signin`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  const token = result.access_token;

  if (response.ok) {
    login(token);
  } else {
    throw new Error(result.message);
  }

  return result as signinDataType;
};

// Update User Function
export const updateUser = async ({
  userId,
  data,
}: {
  userId: string;
  data: {
    email: string;
    phone?: string;
    bio?: string;
    name?: string;
    profileImg?: string;
    gender?: string;
  };
}): Promise<signinDataType> => {
  const token = getToken(); 
  const response: Response = await fetch(`${BaseURL}/users/${userId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
    mode: "cors",
    redirect: "follow",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }

  return response.json();
};
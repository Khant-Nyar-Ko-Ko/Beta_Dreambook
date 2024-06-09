import { BaseURL } from "@/service/ApiEndpoints";
import { login, getToken } from "@/service/authService";
import { signinDataType, signupDataType, userDataType } from "@/utils/type";

// Sign Up User Function
export const signUpUser = async ({
  data,
}: {
  data: {
    email: string;
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
export const updateUser = async ({ data }: { data: userDataType }) => {
  const token = getToken();
  const formData = new FormData();

  if (data.phone) formData.append("phone", data.phone);
  if (data.bio) formData.append("bio", data.bio);
  if (data.name) formData.append("name", data.name);
  if (data.profileImg) formData.append("profileImg", data.profileImg);
  if (data.gender) formData.append("gender", data.gender);

  const response: Response = await fetch(`${BaseURL}/users`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
    mode: "cors",
    redirect: "follow",
    body: formData,
  });

  return response;
};

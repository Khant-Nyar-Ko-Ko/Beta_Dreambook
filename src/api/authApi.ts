import { BaseURL } from "@/service/ApiEndpoints";
import { login } from "@/service/authService";
import { signinDataType, signupDataType } from "@/utils/type";

// Sign Up User Function
export const signUpUser = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
    name: string | "";
    gender: string | null;
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

// // Get User Info Function (using token)
// export const getUserInfo = async (): Promise<signinDataType | null> => {
//   const token = getToken();

//   if (!token) {
//     return null;
//   }

//   const requestOptions: RequestInit = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     mode: "cors",
//     method: "GET",
//     redirect: "follow",
//   };

//   const response: Response = await fetch(`${BaseURL}/users`, requestOptions);
//   const data = await response.json();

//   if (response.status === 401) {
//     return null;
//   }

//   if (!response.ok) {
//     throw new Error(data.message);
//   }

//   return data as signinDataType;
// };

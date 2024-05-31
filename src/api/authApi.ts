import { BaseURL } from "@/service/ApiEndpoints";
import { signinDataType, signupDataType } from "@/utils/type";

export const signUpUser = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
    name: string | "";
    gender: string | null;
  };
}) => {
  const response: Response = await fetch(`${BaseURL}/auth/signup`, {
    headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if(!response.ok){
    throw new Error(result.message);
  }
  return result as signupDataType;
};

export const signInUser = async ({
    data,
  }: {
    data: {
      email: string;
      password: string;
    };
  }) => {
    const response : Response = await fetch(`${BaseURL}/auth/signin`,{
        headers: {
            Accept : "application/json",
            "Content-type" : "application/json"
        },
        method:"POST",
        mode:"cors",
        redirect:"follow",
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if(!response.ok){
        throw new Error(result.message);
    }
    return result.access_token as signinDataType;
}
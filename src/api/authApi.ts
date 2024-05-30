import { BaseURL } from "@/service/ApiEndpoints";
import { signupDataType } from "@/utils/type";

export const signUpUser = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
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

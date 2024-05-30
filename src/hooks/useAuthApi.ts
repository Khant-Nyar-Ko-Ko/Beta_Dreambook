import { signUpUser } from "@/api"
import { signupDataType } from "@/utils/type"
import { useMutation } from "@tanstack/react-query"

export const useSignUpUser = () => {
   return useMutation({
        mutationFn: (data:signupDataType) =>  signUpUser({data})
    })
}
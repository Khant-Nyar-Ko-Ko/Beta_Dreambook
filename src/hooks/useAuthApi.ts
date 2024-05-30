import { signInUser, signUpUser } from "@/api"
import { signinDataType, signupDataType } from "@/utils/type"
import { useMutation } from "@tanstack/react-query"

export const useSignUpUser = () => {
   return useMutation({
        mutationFn: (data:signupDataType) =>  signUpUser({data})
    })
}

export const useSignInUser = () => {
    return useMutation({
        mutationFn: (data: signinDataType) => signInUser({data})
    })
}
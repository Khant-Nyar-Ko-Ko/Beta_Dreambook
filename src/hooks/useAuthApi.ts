import { signInUser, signUpUser } from "@/api"
import { updateUser } from "@/api/authApi"
import { signinDataType, signupDataType, userDataType } from "@/utils/type"
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

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: (data: userDataType) => updateUser({ data })
    });
};
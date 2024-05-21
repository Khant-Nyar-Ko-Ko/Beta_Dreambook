import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { RouteObject } from "react-router-dom";

const AuthRouter :  RouteObject[] = [
    {
        path:'/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <LoginPage/>
            },{
                path: 'register',
                element: <RegisterPage/>
            }
        ]
    }
]

export default AuthRouter;
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import SelectCategoryPage from "@/pages/auth/SelectCategoryPage";
import UserInfoPage from "@/pages/auth/UserInfoPage";
import { RouteObject } from "react-router-dom";

const AuthRouter: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "userinfo",
        element: <UserInfoPage />,
      },
      {
        path: "selectcategory",
        element: <SelectCategoryPage />,
      },
    ],
  },
];

export default AuthRouter;

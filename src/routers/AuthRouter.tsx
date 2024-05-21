import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import SelectCategoryPage from "@/pages/SelectCategoryPage";
import UserInfoPage from "@/pages/UserInfoPage";
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

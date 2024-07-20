import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import SelectCategoryPage from "@/pages/auth/SelectCategoryPage";
import UserInfoPage from "@/pages/auth/UserInfoPage";
import ProtectedAuthRoutes from "@/utils/ProtectedAuthRoutes";
import { Navigate, RouteObject } from "react-router-dom";

const AuthRouter: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <ProtectedAuthRoutes element={<LoginPage />}/> ,
      },
      {
        path: "register",
        element: <ProtectedAuthRoutes element={<RegisterPage />}/>,
      },
      {
        path: "userinfo",
        element:<ProtectedAuthRoutes element={<UserInfoPage />}/>,
      },
      {
        path: "selectcategory",
        element:<ProtectedAuthRoutes element={<SelectCategoryPage />}/>,
      },
      {
        path: '*',
        element: <Navigate to="/home" replace />,
      },
    ],
  },
];

export default AuthRouter;

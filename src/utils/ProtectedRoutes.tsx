import { getToken } from "@/service/authService";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoutes = ({element} : {element : any}) => {
  const token = getToken();

  return token ? element : <Navigate to={"/auth/login"} />;
};

export default ProtectedRoutes;

import { getToken } from "@/service/authService";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedAuthRoutes = ({element} : {element : any}) => {
    const token = getToken();

  return token ? <Navigate to={'/home'}/> : element;

}

export default ProtectedAuthRoutes
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { matchPath, Outlet, useLocation } from "react-router-dom";

const UserLayout = () => {
  const location = useLocation();

  const noFooterRoutes = ["/personalinfo/*", "/bookdetail/*", "/readbook/*","/readchapter/*"];
  const noNavbarRoutes = ["/bookdetail/*"];

  const hideFooter = noFooterRoutes.some((route) =>
    matchPath(route, location.pathname)
  );
  const hideNavbar = noNavbarRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideFooter && <Footer />}
    </div>
  );
};

export default UserLayout;

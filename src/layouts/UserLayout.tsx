import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const noFooterRoutes = ["/personalinfo/*", "/bookdetail/*", "/readbook/*","/readchapter/*"];
  const noNavbarRoutes = ["/bookdetail/*"];

  const hideFooter = noFooterRoutes.some((route) =>
    matchPath(route, location.pathname)
  );
  const hideNavbar = noNavbarRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  const handleFooterButtonClick = (id : string) => {
    if (location.pathname === "/home") {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      navigate(`/home?scrollTo=${id}`);
    }
  };

  return (
    <div>
      <ScrollToTop/>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideFooter && <Footer onButtonClick={handleFooterButtonClick} />}
    </div>
  );
};

export default UserLayout;

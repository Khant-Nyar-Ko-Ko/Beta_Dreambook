import profile from "../../assets/images/contact.jpeg";
import { Button } from "../ui/button";
import { IoPersonSharp, IoExitOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { PiBooks } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { LuBookMarked } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, logout } from "@/service/authService";
import { useUserApi } from "@/hooks/useUserApi";

const PersonalInfoSidebar = () => {
  const token = getToken() || "";
  const navigate = useNavigate();
  const { data: user } = useUserApi(token);

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const renderNavLink = (to: string, icon: React.ReactNode, text: string) => (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button
          variant="personalinfo"
          className={
            isActive
              ? "text-white bg-default"
              : "text-black dark:text-white bg-transparent"
          }
        >
          {icon}
          <p className="hidden font-primary md:block">{text}</p>
          <IoIosArrowForward className="hidden font-primary md:block" />
        </Button>
      )}
    </NavLink>
  );

  return (
    <div className="w-1/5 h-[765px] md:h-[700px] bg-white border border-white dark:border-slate-700 dark:bg-darkMode1">
      <div className="flex flex-col items-center justify-center gap-10 py-2 my-10 md:py-0 md:my-20 md:gap-14">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <img
            src={user?.profileImg == null ? profile : user.profileImg}
            className="object-cover w-10 h-10 rounded-full md:w-16 md:h-16"
            alt="profile"
          />
          <p className="text-xs text-black dark:text-white md:text-lg font-primary">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {renderNavLink("info", <IoPersonSharp />, "Personal Information")}
          {renderNavLink("book-lists", <PiBooks />, "Book Lists")}
          {renderNavLink("fav-books", <CiHeart />, "Favorite Books")}
          {renderNavLink("history", <LuBookMarked />, "History")}
          {renderNavLink("change-pw", <IoPersonSharp />, "Change Password")}
        </div>
        <Button
          variant="personalinfo"
          onClick={handleLogout}
          className="justify-center gap-3 py-10 text-black border-t border-gray-300 rounded-none font-primary dark:text-white"
        >
          <IoExitOutline size="30" />
          <p className="hidden font-primary md:block">Sign Out</p>
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoSidebar;

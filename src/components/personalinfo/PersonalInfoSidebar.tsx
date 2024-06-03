import profile from "../../assets/images/contact.jpeg";
import { Button } from "../ui/button";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { PiBooks } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { LuBookMarked } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PersonalInfoSidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-1/5 max-h-full border">
      <div className="flex flex-col items-center justify-center gap-10 py-2 my-10 md:py-0 md:my-20 md:gap-14">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <img
            src={user?.profileImg == null ? profile : user.profileImg}
            className="object-cover w-10 h-10 rounded-full md:w-16 md:h-16"
            alt="profile"
          />
          <p className="text-xs md:text-lg font-primary">{user?.name}</p>
        </div>
        <div className="flex flex-col gap-5">
          <NavLink to="info">
            {({ isActive }) => (
              <Button
                variant="personalinfo"
                className={
                  isActive
                    ? "text-white bg-default"
                    : "text-black bg-transparent"
                }
              >
                <IoPersonSharp />
                <p className="hidden font-primary md:block">
                  {" "}
                  Personal Information
                </p>

                <IoIosArrowForward className="hidden font-primary md:block" />
              </Button>
            )}
          </NavLink>

          <NavLink to="book-lists">
            {({ isActive }) => (
              <Button
                variant="personalinfo"
                className={
                  isActive
                    ? "text-white bg-default"
                    : "text-black bg-transparent"
                }
              >
                <PiBooks />
                <p className="hidden font-primary md:block"> Book Lists</p>

                <IoIosArrowForward className="hidden font-primary md:block" />
              </Button>
            )}
          </NavLink>

          <NavLink to="fav-books">
            {({ isActive }) => (
              <Button
                variant="personalinfo"
                className={
                  isActive
                    ? "text-white bg-default"
                    : "text-black bg-transparent"
                }
              >
                <CiHeart />
                <p className="hidden font-primary md:block"> Favorite Books</p>

                <IoIosArrowForward className="hidden font-primary md:block" />
              </Button>
            )}
          </NavLink>

          <NavLink to="history">
            {({ isActive }) => (
              <Button
                variant="personalinfo"
                className={
                  isActive
                    ? "text-white bg-default"
                    : "text-black bg-transparent"
                }
              >
                <LuBookMarked />
                <p className="hidden font-primary md:block"> History</p>

                <IoIosArrowForward className="hidden font-primary md:block" />
              </Button>
            )}
          </NavLink>

          <NavLink to="change-pw">
            {({ isActive }) => (
              <Button
                variant="personalinfo"
                className={
                  isActive
                    ? "text-white bg-default"
                    : "text-black bg-transparent"
                }
              >
                <IoPersonSharp />
                <p className="hidden font-primary md:block"> Change Password</p>

                <IoIosArrowForward className="hidden font-primary md:block" />
              </Button>
            )}
          </NavLink>
        </div>

        <Button
          variant="personalinfo"
          onClick={handleLogout}
          className="justify-center gap-3 py-10 border-t border-gray-300 rounded-none font-primary"
        >
          <IoExitOutline size="30" />
          <p className="hidden font-primary md:block">Sign Out</p>
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoSidebar;

import profile from "../../assets/images/profile.jpeg";
import { Button } from "../ui/button";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { PiBooks } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { LuBookMarked } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const PersonalInfoSidebar = () => {
  return (
    <div className="w-1/5 h-full border">
      <div className="flex flex-col items-center justify-center my-20 gap-14">
        <div className="flex items-center gap-3">
          <img
            src={profile}
            className="object-cover w-16 h-16 rounded-full"
            alt="profile"
          />
          <p className="text-lg font-primary">Giga Chad</p>
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
                Personal Information
                <IoIosArrowForward />
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
                Book Lists
                <IoIosArrowForward />
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
                Favorite Books
                <IoIosArrowForward />
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
                History
                <IoIosArrowForward />
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
                Change Password
                <IoIosArrowForward />
              </Button>
            )}
          </NavLink>
        </div>
        <Button
          variant="personalinfo"
          className="justify-center gap-3 py-10 border-t border-gray-300 rounded-none font-primary"
        >
          <IoExitOutline size="30" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoSidebar;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import profile from "../assets/images/contact.jpeg";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  IoExitOutline,
  IoMoonOutline,
  IoPersonSharp,
  IoSunnyOutline,
} from "react-icons/io5";
import { PiBooks } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { getToken, logout } from "@/service/authService";
import { useUserApi } from "@/hooks/useUserApi";
import { useEffect, useState } from "react";

const DropdownMenuItemWrapper = ({ children }: { children: any }) => (
  <div className="px-2 py-1 cursor-pointer">{children}</div>
);

const Profile = () => {
  const token = getToken() || "";
  const { data: user } = useUserApi(token);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDark.addEventListener("change", (e) => {
      if (theme === "system") {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    });
  }, [theme]);

  const handleDropdownOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="select-none ">
      <DropdownMenu>
        <DropdownMenuTrigger onClick={handleDropdownOpen}>
          <div className="flex items-center gap-1">
            <img
              src={user?.profileImg == null ? profile : user.profileImg}
              className="object-cover rounded-full w-9 h-9 md:w-12 md:h-12"
              alt="profile"
            />
            <RiArrowDropDownLine size="30" className="dark:text-white" />
          </div>
        </DropdownMenuTrigger>
        {isOpen &&         <DropdownMenuContent className="bg-white w-[250px] md:w-[300px] rounded px-4 py-2 shadow dark:bg-darkMode1">
          <DropdownMenuLabel>
            <div className="flex items-center gap-2 py-3">
              <img
                src={user?.profileImg == null ? profile : user.profileImg}
                className="object-cover w-10 h-10 rounded-full md:w-12 md:h-12"
                alt="profile"
              />
              <div className="flex flex-col">
                <h5 className="text-sm font-semibold text-black dark:text-white">
                  {user?.name}
                </h5>
                <p className="text-xs text-gray-400 dark:text-white">
                  {user?.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-2 py-3 border-b-2 border-gray-300">
            <DropdownMenuLabel>
              <div className="text-lg font-semibold text-black font-primary dark:text-white">
                Account
              </div>
            </DropdownMenuLabel>
            <NavLink to="/personalinfo">
              <DropdownMenuItemWrapper>
                <div onClick={handleDropdownOpen} className="flex items-center gap-1 text-gray-500 dark:text-white">
                  <IoPersonSharp />
                  <p>Profile</p>
                </div>
              </DropdownMenuItemWrapper>
            </NavLink>
            <NavLink to="/personalinfo/book-lists">
              <DropdownMenuItemWrapper>
                <div onClick={handleDropdownOpen} className="flex items-center gap-1 text-gray-500 dark:text-white">
                  <PiBooks />
                  <p>Book Lists</p>
                </div>
              </DropdownMenuItemWrapper>
            </NavLink>
            <NavLink to="/personalinfo/fav-books">
              <DropdownMenuItemWrapper>
                <div onClick={handleDropdownOpen} className="flex items-center gap-1 text-gray-500 dark:text-white">
                  <FaHeart />
                  <p>Favourite Books</p>
                </div>
              </DropdownMenuItemWrapper>
            </NavLink>
          </div>
          <div className="flex flex-col gap-2 py-3 border-b-2 border-gray-300">
            <DropdownMenuLabel>
              <div className="text-lg font-semibold text-black font-primary dark:text-white">
                Theme
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItemWrapper>
              <div className="flex items-center gap-2 text-gray-500 dark:text-white">
                <input
                  id="lightMode"
                  type="radio"
                  value="light"
                  checked={theme === "light"}
                  onChange={handleThemeChange}
                  className="border-2"
                />
                <label htmlFor="lightMode">Light Mode</label>
                <IoSunnyOutline />
              </div>
            </DropdownMenuItemWrapper>
            <DropdownMenuItemWrapper>
              <div className="flex items-center gap-2 text-gray-500 dark:text-white">
                <input
                  id="darkMode"
                  type="radio"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                  className="border-2"
                />
                <label htmlFor="darkMode">Dark Mode</label>
                <IoMoonOutline />
              </div>
            </DropdownMenuItemWrapper>
          </div>
          <div className="py-2">
            <NavLink to="/">
              <Button variant="menu" onClick={handleLogout}>
                <IoExitOutline size="20" />
                <p className="pl-1 font-primary">Log out</p>
              </Button>
            </NavLink>
          </div>
        </DropdownMenuContent>}

      </DropdownMenu>
    </div>
  );
};

export default Profile;

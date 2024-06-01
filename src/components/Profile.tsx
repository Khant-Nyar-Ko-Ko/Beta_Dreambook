import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import profile from "../assets/images/profile.jpeg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMoonOutline, IoPersonSharp, IoSunnyOutline } from "react-icons/io5";
import { PiBooks } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { Checkbox } from "./ui/checkbox";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";



const Profile = () => {
  const { logout } = useAuth();

  return (
    <div className="select-none ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-1">
            <img
              src={profile}
              className="object-cover w-10 h-10 rounded-full md:w-12 md:h-12"
              alt="profile"
            />
            <RiArrowDropDownLine size="30" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-[300px] rounded px-4 py-2">
          <DropdownMenuLabel>
            <div className="flex items-center gap-2 py-3">
              <img
                src={profile}
                className="object-cover w-10 h-10 rounded-full md:w-12 md:h-12"
                alt="profile"
              />
              <div className="flex flex-col">
                <h5 className="text-sm font-semibold">Giga Chad</h5>
                <p className="text-xs text-gray-400">tonystark12@gmail.com</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-2 py-3 border-b-2 border-gray-300">
            <DropdownMenuLabel>
              <div className="text-lg font-semibold font-primary">Account</div>
            </DropdownMenuLabel>
            <NavLink to="/personalinfo">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 text-gray-500">
                <IoPersonSharp />
                <p>Profile</p>
              </div>
            </DropdownMenuItem>
            </NavLink>
            <NavLink to="/personalinfo/book-lists">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 text-gray-500">
                <PiBooks />

                <p>Book Lists</p>
              </div>
            </DropdownMenuItem>
              </NavLink>
              <NavLink to="/personalinfo/fav-books">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 text-gray-500">
                <FaHeart />
                <p>Favourite Books</p>
              </div>
            </DropdownMenuItem>
            </NavLink>
          </div>
          <div className="flex flex-col gap-2 py-3 border-b-2 border-gray-300">
            <DropdownMenuLabel>
              <div className="text-lg font-semibold font-primary">Theme</div>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <div className="flex items-center gap-2 text-gray-500">
                <Checkbox className="border-2" />
                <p>Light Mode</p>
                <IoSunnyOutline />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <div className="flex items-center gap-2 text-gray-500">
                <Checkbox className="border-2" />
                <p>Dark Mode</p>
                <IoMoonOutline />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-1 text-gray-500">
                <p>System</p>
                <CiSettings />
              </div>
            </DropdownMenuItem>
          </div>
          <div className="py-2 ">
          <NavLink to="/">
            <Button variant="menu" onClick={logout}>
              Logout
            </Button>
          </NavLink>
      </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;

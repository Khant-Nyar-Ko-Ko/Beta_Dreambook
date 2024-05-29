import { useState } from "react";
import { IoPersonCircle, IoMenu, IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/Logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=" w-screen h-[80px] flex justify-between items-center px-4 md:px-[130px] bg-white shadow sticky top-0 left-0 z-30">
      <div className="flex items-center gap-2">
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="text-3xl">
            <IoMenu />
          </button>
        </div>
        <NavLink to={"/"}>
          <img src={logo} className="w-20 h-16" alt="Logo" />
        </NavLink>
      </div>
      <div className="hidden md:flex gap-2 w-auto h-[40px] items-center">
        <NavLink to="/home">
          {({ isActive }) => (
            <Button
              variant="menu"
              className={
                isActive ? "text-white bg-default" : "text-black bg-transparent"
              }
            >
              Home
            </Button>
          )}
        </NavLink>
        <NavLink to="/library">
          {({ isActive }) => (
            <Button
              variant="menu"
              className={
                isActive ? "text-white bg-default" : "text-black bg-transparent"
              }
            >
              Library
            </Button>
          )}
        </NavLink>
        <NavLink to="/bookcrafting">
          {({ isActive }) => (
            <Button
              variant="menu"
              className={
                isActive ? "text-white bg-default" : "text-black bg-transparent"
              }
            >
              Book crafting
            </Button>
          )}
        </NavLink>
        {/* Need to delete later */}
        <NavLink to="/personalinfo">
          {({ isActive }) => (
            <Button
              variant="menu"
              className={
                isActive ? "text-white bg-default" : "text-black bg-transparent"
              }
            >
              Personal info
            </Button>
          )}
        </NavLink>
        {/* Need to delete later */}
      </div>
      <div className="hidden md:flex gap-[10px] items-center">
        <NavLink to={"/auth/login"}>
          <Button variant="white">
            <IoPersonCircle className="w-6 h-6 rounded" />
            Login
          </Button>
        </NavLink>
        <NavLink to={"/auth/register"}>
          <Button variant="white">Register</Button>
        </NavLink>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-60" onClick={toggleMenu}></div>
      )}
      <div
        className={`fixed top-0 left-0 w-full h-full shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0 " : "-translate-x-full"
        } md:hidden z-50`}
      >
        <div className="h-screen bg-white w-[250px]">
          <div className="flex flex-col gap-4 p-4">
            <button onClick={toggleMenu} className="self-end text-3xl">
              <IoClose />
            </button>
            <NavLink to="/home">
              {({ isActive }) => (
                <Button
                  variant="menu"
                  className={
                    isActive ? "text-default" : "text-black"
                  }
                >
                  Home
                </Button>
              )}
            </NavLink>
            <NavLink to="/library">
              {({ isActive }) => (
                <Button
                  variant="menu"
                  className={
                    isActive ? "text-default" : "text-black"
                  }
                >
                  Library
                </Button>
              )}
            </NavLink>
            <NavLink to="/bookcrafting">
              {({ isActive }) => (
                <Button
                  variant="menu"
                  className={
                    isActive ? "text-default" : "text-black"
                  }
                >
                  Book crafting
                </Button>
              )}
            </NavLink>
            <NavLink to={"/auth/login"} onClick={toggleMenu}>
              <Button variant="white">
                <IoPersonCircle className="w-6 h-6 rounded" />
                Login
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <NavLink to={"/auth/register"} onClick={toggleMenu}>
          <Button variant="default">Register</Button>
        </NavLink>
      </div>
    </div>
    // </div>
  );
};

export default Navbar;

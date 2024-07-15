import { IoClose, IoLayers, IoMenu } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import logo from "../assets/images/Logo.svg";
import { useState } from "react";
import { Button } from "./ui/button";
import { PiBookOpenText } from "react-icons/pi";
import { MdOutlineComment } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";



const BookDetailMobile = () => {
  const {slug} = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
    <nav className='flex justify-between px-4 py-2 border border-t-0 border-b border-x-0 md:hidden border-slate-600'>
      <button onClick={toggleMenu} className="text-3xl text-black dark:text-white">
            <IoMenu />
          </button>
          <NavLink to={"/home"}>
          <img src={logo} className="w-20 h-16" alt="Logo" />
        </NavLink>
    </nav>
    {isMenuOpen && (
        <div
          className="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-60"
          onClick={toggleMenu}
        ></div>
      )}
          <div
        className={`fixed top-0 left-0 w-full h-full shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0 " : "-translate-x-full"
        } md:hidden z-50`}
      >
        <div className="h-screen bg-default w-[250px]">
          <div className="flex flex-col gap-4 p-4">
            <button onClick={toggleMenu} className="self-end text-3xl text-white">
              <IoClose />
            </button>
            <NavLink to={`/bookdetail/${slug}/childBookdetail`}>
              {({ isActive }) => (
                <Button
                  variant="menu"
                  className={isActive ? "text-slate-300" : "text-white"}
                >
                   <PiBookOpenText size="24" />
                   <p>Book Details</p>
                </Button>
              )}
            </NavLink>
            <NavLink to={`/bookdetail/${slug}/chapters`}>
              {({ isActive }) => (
                <Button
                  variant="menu"
                  className={isActive ? "text-slate-300" : "text-white"}
                >
                  <IoLayers size="24" />
                  <p>Chapters</p>
                </Button>
              )}
            </NavLink>
            <NavLink to={`/bookdetail/${slug}/comment`}>
              {({ isActive }) => (
                <Button
                  variant="menu"
                  className={isActive ? "text-slate-300" : "text-white"}
                >
                  <MdOutlineComment size="24" />
                  <p>Comments</p>
                </Button>
              )}
            </NavLink>
          </div>
          <div className="w-full ">
          <NavLink to="/">
            <Button
              variant="detail"
              className="w-full gap-3 py-10 pl-5 text-white border-t border-gray-300 rounded-none bg-default font-primary"
            >
              <FaArrowLeftLong size="20" />
              Exit to Booklist
            </Button>
          </NavLink>
        </div>
        </div>
      </div>
    </>
  )
}

export default BookDetailMobile
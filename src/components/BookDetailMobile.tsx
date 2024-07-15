import { IoClose, IoLayers, IoMenu } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import logo from "../assets/images/Logo.svg";
import { useState } from "react";
import { Button } from "./ui/button";
import { PiBookOpenText } from "react-icons/pi";
import { MdOutlineComment } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import cover from "../assets/images/Login/Vector 2.svg";




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
          <div className="flex flex-col gap-4 py-5">
            <button onClick={toggleMenu} className="self-end text-3xl text-white">
              <IoClose />
            </button>
            <NavLink
            to={"/"}
            className="flex items-center gap-2 px-3 py-4 border-b pl- border-indigo-300/50"
          >
            <img src={cover} className="w-8 md:w-16 " alt="" />
            <div className=" w-[300px] md:w-[350px] flex flex-col gap-1 ">
              <h3 className="font-bold text-white text-sx font-primary">
                Dream Book
              </h3>
              <p className=" text-[10px] md:text-sx text-white font-primary">
                Book Reading & Publishing Platform
              </p>
            </div>
          </NavLink>
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
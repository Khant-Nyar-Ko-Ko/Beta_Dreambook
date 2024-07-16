import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineComment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { PiBookOpenText } from "react-icons/pi";
import { IoLayers } from "react-icons/io5";
import { Button } from "./ui/button";
import logo from "../assets/images/Login/Vector 2.svg";


const BookDetailSideBar = () => {
  return (
    <div className="h-screen text-white md:w-1/5 bg-default">
      <div className="flex-col hidden md:flex">
        <div className="w-full col-span-3 gap-7">
          <NavLink
            to={"/"}
            className="flex items-center gap-2 py-5 pl-5 border-b border-indigo-300/50"
          >
            <img src={logo} className="w-8 md:w-16 " alt="" />
            <div className=" w-[300px] md:w-[350px] flex flex-col gap-1 ">
              <h3 className="font-bold text-white text-sx font-primary">
                Dream Book
              </h3>
              <p className=" text-[10px] md:text-sx text-white font-primary">
                Book Reading & Publishing Platform
              </p>
            </div>
          </NavLink>

          <NavLink to="childBookdetail">
            {({ isActive }) => (
              <Button
                variant="detail"
                className={`py-8 ${
                  isActive
                    ? "text-white bg-blue-400 border-r-4"
                    : "text-white bg-default"
                }`}
              >
                <PiBookOpenText size="24" />
                <p>Book Details</p>
              </Button>
            )}
          </NavLink>

          <NavLink to="chapters">
            {({ isActive }) => (
              <Button
                variant="detail"
                className={`py-8 ${
                  isActive
                    ? "text-white bg-blue-400 border-r-4"
                    : "text-white bg-default"
                }`}
              >
                <IoLayers size="24" />
                <p>Chapters</p>
              </Button>
            )}
          </NavLink>

          <NavLink to="comment">
            {({ isActive }) => (
              <Button
                variant="detail"
                className={`py-8 ${
                  isActive
                    ? "text-white bg-blue-400 border-r-4"
                    : "text-white bg-default"
                }`}
              >
                <MdOutlineComment size="24" />
                <p>Comments</p>
              </Button>
            )}
          </NavLink>
        </div>

        <div className="w-full pt-96 ">
          <NavLink to="/">
            <Button
              variant="detail"
              className="w-full gap-3 py-10 pl-5 mt-5 border-t border-gray-300 rounded-none bg-default font-primary"
            >
              <FaArrowLeftLong size="20" />
              Exit to Booklist
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BookDetailSideBar;

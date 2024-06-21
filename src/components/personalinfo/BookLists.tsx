import { Checkbox } from "@radix-ui/react-checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { RiFilter3Line } from "react-icons/ri";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const BookLists = () => {
  return (
    <div className="flex flex-col w-4/5 h-full px-3 py-5 bg-white dark:bg-darkMode1">
      <div className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5">
        <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
          <div className="p-[7px] border rounded">
            <RiFilter3Line className="text-[16px] md:text-[24px]" />
          </div>
          <div className="px-1 py-2 border rounded md:px-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between gap-1 text-xs md:px-2 md:gap-5 md:text-sm">
                <p>Sort by default</p>
                <IoIosArrowDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Checkbox /> <p className="px-2">Sort by random</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox /> <p className="px-2">Sort by latest</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox /> <p className="px-2">Sort by A-Z</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <NavLink to="/bookcrafting">
            <Button className="flex gap-2">
              <FaPlus />
               <p className="text-xs md:text-base">Create Book</p>
            </Button>
          </NavLink>
        </div>
        <div className="order-2 w-full mt-3 md:order-1 md:mt-0 md:w-auto">
          <div className="relative ">
            <IoIosSearch
              className="absolute left-2 top-2 md:top-[10px] text-[16px] md:text-[24px]"
              color="gray"
            />
            <Input
              type="search"
              className="w-full bg-white pl-7 md:pl-12 md:w-auto dark:bg-darkMode1"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-20 bg-white md:mt-0 dark:bg-darkMode1">
        <iframe
          src="https://lottie.host/embed/8866455b-434f-412d-863b-334f6c5c5724/EzyvqFxRUM.json"
          className="w-full h-32 text-black md:h-96 dark:text-white"
          title="Animation"
        ></iframe>
        <p className="mt-3 text-center text-black opacity-50 font-primary dark:text-white">
          "Discover literary treasures: Explore our curated book lists collection today."
        </p>
      </div>
    </div>
  );
};

export default BookLists;

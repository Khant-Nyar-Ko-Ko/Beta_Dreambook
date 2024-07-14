import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

interface SortDropdownProps {
  sort: string | undefined;
  setSort: (sortOrder: string | undefined) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sort, setSort }) => {
  const handleSortChange = (sortOrder: string | undefined) => {
    setSort(sortOrder);
  };

  return (
    <div className="px-1 py-1 md:py-2 border rounded md:px-2 w-[100px] md:w-[200px]">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center w-[80px] md:w-[150px] select-none justify-between gap-1 text-xs md:px-2 md:gap-5 md:text-sm text-black dark:text-white z-10">
          <p>{sort === "a-z" ? "Sort by A-Z" : "Sort by latest"}</p>
          <IoIosArrowDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-darkMode1 w-[150px] flex flex-col gap-3 select-none border px-4 rounded py-2 text-black dark:text-white z-20">
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => handleSortChange("latest")}
          >
            <input type="radio" checked={sort !== "a-z"} readOnly />
            <label htmlFor="latest" className="text-sm font-primary">
              Sort by latest
            </label>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 "
            onClick={() => handleSortChange("a-z")}
          >
            <input type="radio" checked={sort === "a-z"} readOnly />
            <label htmlFor="a-z" className="text-sm font-primary">
              Sort by A-Z
            </label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortDropdown;

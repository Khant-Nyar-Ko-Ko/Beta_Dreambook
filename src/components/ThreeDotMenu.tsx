import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "./ui/button";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ThreeDotMenu = ({id}:{id : number}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };
  return (
    <div className="relative">
      <Button variant="white" className="z-10 hover:bg-white hover:text-default" onClick={toggleDropdown}>
        <BsThreeDotsVertical />
      </Button>
      {dropdownOpen && (
        <div
          className="absolute top-0 z-10 w-48 bg-white border rounded-md shadow-md right-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 divide-y divide-gray-100 font-primary" role="none">
            <NavLink to={`chapterEdit/${id}`}>
            <Button
              variant="white"
              className="block w-full px-4 py-2 text-sm rounded-none text-default hover:text-black hover:bg-gray-100"
              role="menuitem"
              >
              Edit
            </Button>
              </NavLink>
            <Button
              variant="white"
              className="block w-full px-4 py-2 text-sm text-red-500 rounded-none hover:text-black hover:bg-gray-100"
              role="menuitem"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;

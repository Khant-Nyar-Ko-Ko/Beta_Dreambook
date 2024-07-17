import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import { Modal, Box, Typography, IconButton } from "@mui/material";
// import { Input } from "./ui/input";
// import Toolbar from "./Toolbar";
// import CloseIcon from "@mui/icons-material/Close";
import { useGetChapter } from "@/hooks/useChapterApi";
import DeleteChapter from "./bookdetails/DeleteChapter";
import { useChapterContext } from "@/contexts/ChapterContext";
import { Button } from "./ui/button";

const ThreeDotMenu = ({ id }: { id: number }) => {
  console.log(id);

  const { slug } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {setEdit} = useChapterContext();

  const {
    data,
  } = useGetChapter({ slug: slug ?? "" });

  console.log(data);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const toggleEdit = () => {
    setEdit((prev: {id : number| null; status : boolean}) => ({
      id, status : !prev.status
    }))
  }

  return (
    <div className="relative ">
      <Button
        className="z-10"
        variant="white"
        onClick={toggleDropdown}
      >
        <BsThreeDotsVertical />
      </Button>
      {dropdownOpen && (
        <div
          className="absolute top-0 z-10 w-48 border rounded shadow md:border-darkMode2 right-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div
            className="bg-white divide-y divide-darkMode2 dark:bg-darkMode1 font-primary"
            role="none"
          >
            <Button
              onClick={toggleEdit}
              className="block w-full px-4 text-sm text-default hover:text-black hover:dark:text-white hover:bg-gray-100 hover:dark:bg-darkMode2"
              role="menuitem"
              variant="white"
            >
              Edit
            </Button>
            <DeleteChapter id={id}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;

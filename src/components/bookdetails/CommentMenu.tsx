import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteComment from "./DeleteComment";
import { useCommentContext } from "@/contexts/CommentContext";
import { Button } from "../ui/button";
// import { Button } from "@mui/material";


const CommentMenu = ({id} : {id:number}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {setReply} = useCommentContext();

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDropdownOpen((prev) => !prev);
      };

      const toggleReply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setReply((prev: {id : number| null; status : boolean}) => ({
            id, status : !prev.status
          }))
          toggleDropdown(e)
      }
      
  return (
    <div className="relative ">
    <Button
    variant="white"
      className="z-10 hover:bg-white hover:text-default"
      onClick={toggleDropdown}
    >
      <BsThreeDotsVertical />
    </Button>
    {dropdownOpen && (
      <div
        className="absolute top-0 z-10 w-48 border rounded-md shadow-md right-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div
          className="py-1 bg-white divide-y divide-gray-100 dark:bg-darkMode1 font-primary"
          role="none"
        >
          <Button
            onClick={toggleReply}
            className="block w-full px-4 py-2 text-sm rounded-none text-default hover:text-black hover:dark:text-white hover:bg-gray-100 hover:dark:bg-darkMode2"
            role="menuitem"
            variant="white"
          >
            Reply
          </Button>
          <DeleteComment id={id}/>
        </div>
      </div>
    )}
  </div>
  )
}

export default CommentMenu
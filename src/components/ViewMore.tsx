import { IoIosArrowForward } from "react-icons/io";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const ViewMore = () => {
  return (
    <>
      <NavLink to={"/library"}>
        <Button
          variant="white"
          className="flex items-center gap-2 text-center text-black hover:text-black hover:bg-transparent"
        >
          View More <IoIosArrowForward />
        </Button>
      </NavLink>
    </>
  );
};

export default ViewMore;

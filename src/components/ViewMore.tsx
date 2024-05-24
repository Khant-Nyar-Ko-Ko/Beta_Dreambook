import { IoIosArrowForward } from "react-icons/io";
import { Button } from "./ui/button";

const ViewMore = () => {
  return (
    <>
      <Button
        variant="white"
        className="flex items-center gap-2 text-center text-black hover:text-black hover:bg-transparent"
      >
        View More <IoIosArrowForward />
      </Button>
    </>
  );
};

export default ViewMore;

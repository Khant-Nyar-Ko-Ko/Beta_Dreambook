import { Outlet } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";

const Chapters = () => {
  return (
    <div className="flex flex-col w-4/5 h-auto px-3 my-5 font-primary">
      <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50 ">
        <h1 className="mx-5 text-3xl font-bold ">Chapters</h1>

        <SwitchButton />
      </div>
      <div className="mx-auto mt-auto mb-auto text-center ">
        <h1 className="mt-3 text-2xl font-normal">Craft a Chapter</h1>
        <p className="mt-3 text-gray-400">
          Could you please draft a comprehensive chapter for the book?
        </p>
        <Button className="flex gap-2 mx-auto mt-3">
          <FaPlus />
          Create New Chapter
        </Button>
      </div>

      <Outlet />
    </div>
  );
};

export default Chapters;

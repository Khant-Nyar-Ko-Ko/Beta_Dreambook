import { Outlet, useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";
// import { Button } from "./ui/button";
// import { FaPlus } from "react-icons/fa6";
import ChapterCreationModal from "./ChapterCreationModal";
// import Toolbar from "./Toolbar";

const Chapters = () => {
  const {slug} = useParams();
  
  return (
    <div className="flex flex-col w-4/5 h-auto px-3 my-5 font-primary">
      <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50 ">
        <h1 className="mx-5 text-3xl font-bold ">Chapters</h1>

        <SwitchButton />
      </div>
      <div className="flex flex-col items-center justify-center mx-auto mt-auto mb-auto text-center ">
        <iframe
          src="https://lottie.host/embed/8866455b-434f-412d-863b-334f6c5c5724/EzyvqFxRUM.json"
          className="w-32 h-32"
          title="Animation"
        ></iframe>
        <h1 className="mt-3 text-2xl font-normal">Craft a Chapter</h1>
        <p className="text-gray-400 ">
          Could you please draft a comprehensive chapter for the book?
        </p>

        <div>
          <ChapterCreationModal slug={slug} />
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Chapters;

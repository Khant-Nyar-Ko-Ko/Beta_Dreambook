import background from "../assets/images/AuthBgImage.avif";
import { Button } from "./ui/button";
import newPublishingBook from "../assets/images/NewPublishingBook.png";
import { NavLink } from "react-router-dom";

const NewPublishingBook = () => {
  return (
    <div className="relative w-screen h-[450px] overflow-hidden">
      {/* background */}
      <img
        src={background}
        className="absolute top-0 left-0 object-cover w-full h-full"
        alt="Background"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-[450px] overflow-hidden bg-background opacity-80"></div>
      <div className="absolute top-0 left-0 z-20 flex flex-col items-start justify-center h-full gap-5 mx-10 md:mx-20 md:flex-row">
        <div className="z-10 flex flex-col items-start justify-center gap-8 md:w-1/2">
          <div className="flex flex-col gap-4">
            <p className="text-lg text-white md:text-xl font-primary">
              Latest collections
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-5xl font-primary">
              The New Publishing Books
            </h2>
          </div>
          <NavLink to={"/library"}>
              <Button>Explore Now</Button>
            </NavLink>
        </div>
        <div className="z-10 flex flex-col items-start justify-center w-1/2 gap-5">
          <img src={newPublishingBook} className=" w-[300px]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default NewPublishingBook;

import background from "../assets/images/AuthBgImage.avif";
import { Button } from "./ui/button";
import newPublishingBook from "../assets/images/NewPublishingBook.png";

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
      <div className="absolute top-0 left-0 z-20 flex justify-center w-full h-full mx-20">
       <div className="z-10 flex flex-col items-start justify-center w-1/2 gap-8">
        <div className="flex flex-col gap-4">
            <p className="text-xl text-white font-primary">Latest collections</p>
            <h2 className="text-5xl font-semibold text-white font-primary">The New Publishing Books</h2>
        </div>
        <Button className="py-5 font-semibold text-center w-60 h-14">
            Explore Now
          </Button>
       </div>
       <div className="z-10 flex flex-col items-center justify-center w-1/2 gap-5">
        <img src={newPublishingBook} className=" w-[500px]" alt="" />
       </div>
      </div>
    </div>
  );
};

export default NewPublishingBook;

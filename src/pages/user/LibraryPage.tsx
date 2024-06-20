/* eslint-disable @typescript-eslint/no-explicit-any */

import LibCategory from "@/components/librarycomponents/LibCategory";
import libraryBg from "../../assets/images/library/librarybg.png";

import LibBookSection from "@/components/librarycomponents/LibBookSection";

const LibraryPage = () => {
  return (
    <div>
      <div className="relative w-screen h-[340px]">
        <img
          src={libraryBg}
          className="absolute top-0 left-0 w-full h-full object-fit"
          alt="Background"
        />
        <div className="absolute top-0 left-0 z-10 w-full h-full opacity-20 bg-default"></div>
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center gap-5">
            <h3 className="text-3xl font-semibold text-white font-primary">
              Library
            </h3>
            <p className="text-white font-primary">
              Explore your favorite books
            </p>
            <p className="text-white font-primary">
              Reading is the best for get idea, Keep Reading
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-screen">
        <LibCategory />
        <LibBookSection />
      </div>
    </div>
  );
};

export default LibraryPage;

/* eslint-disable @typescript-eslint/no-explicit-any */

import LibCategory from "@/components/librarycomponents/LibCategory";
import libraryBg from "../../assets/images/library/librarybg.png";

import LibBookSection from "@/components/librarycomponents/LibBookSection";
import {motion} from "framer-motion";

const LibraryPage = () => {
  return (
    <div className="w-screen overflow-x-hidden select-none">
      <div className="relative w-screen h-[200px] md:h-[340px]">
        <img
          src={libraryBg}
          className="absolute top-0 left-0 w-full h-full object-fit"
          alt="Background"
        />
        <div className="absolute top-0 left-0 z-10 w-full h-full opacity-20 bg-default dark:bg-darker"></div>
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center gap-5">
            <motion.h3 initial={{x: -300}} animate={{x: 0}} transition={{duration: 1.4}} className="text-2xl font-semibold text-white md:text-3xl font-primary">
              Library
            </motion.h3>
            <motion.p initial={{x: -300}} animate={{x: 0}} transition={{duration: 1.2}} className="text-sm text-white md:text-base font-primary">
              Explore your favorite books
            </motion.p>
            <motion.p initial={{x: -300}} animate={{x: 0}} transition={{duration: 1}} className="text-sm text-white md:text-base font-primary">
              Reading is the best for get idea, Keep Reading
            </motion.p>
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

import { Button } from "./ui/button";
// import landing1 from "../assets/images/landing/landingphoto1.png";

import bg1 from "../assets/images/landing/bg1.png";
import bg2 from "../assets/images/landing/bg2.png";
import pot from "../assets/images/landing/daisypot.png";
import DownloadOnMobile from "./DownloadOnMobile";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import PopularHightlight from "./PopularHightlight";

const Hero = () => {
  return (
    <div className="relative">
      <img
        src={bg1}
        className="absolute dark:opacity-10 top-0 left-0 w-[70px] md:w-[120px]"
        alt="bg1"
      />
      <img
        src={bg2}
        className="absolute dark:opacity-10 z-0 bottom-0 right-10 md:right-1 w-[100px] md:w-[600px]"
        alt="bg2"
      />
      <img
        src={pot}
        className="absolute z-0 bottom-5 md:bottom-0 right-0 w-[100px] md:w-[200px]"
        alt="bg2"
      />
      <div className="flex flex-col w-screen h-auto gap-5 px-5 py-5 md:gap-0 md:flex-row md:px-0 bg-primarybg dark:bg-darkMode2 md:py-32">
        <div className="z-10 flex flex-col justify-center w-auto gap-5 md:items-center md:w-1/2">
          <div className="flex flex-col gap-10 px-10 mt-10 md:px-0 md:mt-0">
            <motion.div initial={{x: -500}} animate={{x :0}} transition={{duration:0.5, delay: 1}} className="text-3xl font-semibold text-black md:text-5xl font-primary dark:text-white">
              <h2>Discover</h2>
              <h2>Magic of Books</h2>
            </motion.div>
            <motion.p initial={{x: -600}} animate={{x :0}} transition={{duration:1, delay: 1}} className=" w-[300px] md:w-[450px] text-sm md:text-base font-primary opacity-60 text-black dark:text-white">
              "Unlock worlds, one page at a time: Dive into the stories that
              shape us. Welcome to a sanctuary for book lovers, where words
              ignite passions and journeys never end."
            </motion.p>
            <motion.div initial={{x: -500}} animate={{x :0}} transition={{duration:0.5, delay: 1}}>
            <NavLink to={"/library"}>
              <Button>Explore Now</Button>
            </NavLink>
            </motion.div>
            <div className="flex flex-col gap-3 ">
              <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration:1, delay: 1}} className=" text-[10px] md:text-sm uppercase text-light font-primary">
                Try on mobile
              </motion.p>
              <DownloadOnMobile />
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-col items-center justify-center w-[300px] h-[400px] md:h-auto gap-5 md:justify-center md:w-1/2">
        <PopularHightlight/>
        </div>
      </div>
    </div>
  );
};

export default Hero;

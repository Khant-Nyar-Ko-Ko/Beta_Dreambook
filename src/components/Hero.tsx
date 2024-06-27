import { Button } from "./ui/button";
import landing1 from "../assets/images/landing/landingphoto1.png";

import bg1 from "../assets/images/landing/bg1.png";
import bg2 from "../assets/images/landing/bg2.png";
import pot from "../assets/images/landing/daisypot.png";
import DownloadOnMobile from "./DownloadOnMobile";
import { NavLink } from "react-router-dom";

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
      <div className="flex flex-col w-screen h-auto px-5 py-5 md:flex-row md:px-0 bg-primarybg dark:bg-darkMode2 md:py-32">
        <div className="z-10 flex flex-col justify-center w-auto gap-5 md:items-center md:w-1/2">
          <div className="flex flex-col gap-10 px-10 mt-10 md:px-0 md:mt-0">
            <div className="text-3xl font-semibold text-black md:text-5xl font-primary dark:text-white">
              <h2>Discover</h2>
              <h2>Magic of Books</h2>
            </div>
            <p className=" w-[300px] md:w-[450px] text-sm md:text-base font-primary opacity-60 text-black dark:text-white">
              "Unlock worlds, one page at a time: Dive into the stories that
              shape us. Welcome to a sanctuary for book lovers, where words
              ignite passions and journeys never end."
            </p>
            <NavLink to={"/library"}>
              <Button>Explore Now</Button>
            </NavLink>
            <div className="flex flex-col gap-3 ">
              <p className=" text-[10px] md:text-sm uppercase text-light font-primary">
                Try on mobile
              </p>
              <DownloadOnMobile />
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-col items-center w-auto gap-5 md:justify-center md:w-1/2">
          <img
            className="h-auto mt-10 md:mt-0 w-[250px] md:w-[500px]"
            src={landing1}
            alt=""
          />
          <p className="z-10 text-black font-primary dark:text-white">Most Popular Books This Week</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import About from "@/components/About";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import NewPublishingBook from "@/components/NewPublishingBook";
import TrendingCategory from "@/components/TrendingCategory";
import ViewMore from "@/components/ViewMore";
import "swiper/css";
import PopularBook from "@/components/PopularBook";
import LatestBook from "@/components/LatestBook";
import { IoIosArrowDropup } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const scrollTo = queryParams.get('scrollTo');
    if (scrollTo) {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [location.search]);

   const scrollToTop = (id : string) => {
    const section =  document.getElementById(id);
     if (section) {
       section.scrollIntoView({ behavior: 'smooth' ,block: 'start'});
     }
   };
   
  return (
    <div className="bg-white select-none dark:bg-darkMode1">
      {/* Hero Section */}
      <div id="home">
      <Hero />
      </div>
      {/* About Section */}
      <About />
      {/* Popular Books */}
      <div id="popular-books">
        <PopularBook />
      </div>
      {/* Trending Category */}
      <div className="flex items-center justify-between w-screen px-10 md:px-[130px]">
        <h4 className="text-lg text-black md:text-2xl font-primary dark:text-white">
          Trending Category
        </h4>
        <ViewMore />
      </div>
      <div className="flex justify-center mb-10">
        <div className="grid justify-center grid-cols-1 my-5 gap-7 md:grid-cols-3">
          <TrendingCategory />
        </div>
      </div>
      {/* Latest Book */}
      <div id="latest-books">
      <div className="flex items-center justify-between w-screen px-10 md:px-[130px]">
        <h4 className="text-lg text-black md:text-2xl font-primary dark:text-white">
          Latest Books
        </h4>
        <ViewMore />
      </div>
      <LatestBook />
      </div>
      <NewPublishingBook />
      {/* FAQ */}
      <div className="py-10" id="faq">
        <h4 className="text-lg text-center text-black md:text-2xl font-primary dark:text-white">
          FAQ
        </h4>
        <Faq />
      </div>
      <div className="flex justify-end px-6 pb-5 md:px-32">
      <IoIosArrowDropup onClick={() => scrollToTop('home')} className=" text-default" size="40px"/>

      </div>
    </div>
  );
};

export default HomePage;

import About from "@/components/About";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import NewPublishingBook from "@/components/NewPublishingBook";
import TrendingCategory from "@/components/TrendingCategory";
import ViewMore from "@/components/ViewMore";
import "swiper/css";
import PopularBook from "@/components/PopularBook";
import LatestBook from "@/components/LatestBook";

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-darkMode1">
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <About />
      {/* Popular Books */}
      <PopularBook />
      {/* Trending Category */}
      <div className="flex items-center justify-between w-screen px-10 md:px-[130px]">
        <h4 className="text-lg text-black md:text-2xl font-primary dark:text-white">Trending Category</h4>
        <ViewMore  />
      </div>
      <div className="flex justify-center mb-10">
        <div className="grid justify-center grid-cols-1 my-5 gap-7 md:grid-cols-3">
          <TrendingCategory />
        </div>
      </div>
      {/* Latest Book */}
      <div className="flex items-center justify-between w-screen px-10 md:px-[130px]">
        <h4 className="text-lg text-black md:text-2xl font-primary dark:text-white">Latest Books</h4>
        <ViewMore />
      </div>
      <LatestBook />
      <NewPublishingBook />
      {/* FAQ */}
      <div className="py-10">
        <h4 className="text-lg text-center text-black md:text-2xl font-primary dark:text-white">FAQ</h4>
        <Faq />
      </div>
    </div>
  );
};

export default HomePage;

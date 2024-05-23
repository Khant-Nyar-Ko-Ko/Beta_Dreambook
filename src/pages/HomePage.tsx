import About from "@/components/About";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import LatestBookCard from "@/components/LatestBookCard";
import NewPublishingBook from "@/components/NewPublishingBook";
import PopularBookCard from "@/components/PopularBookCard";
import TrendingCategory from "@/components/TrendingCategory";
import ViewMore from "@/components/ViewMore";


const HomePage = () => {
  return (
    <div className="mb-10 ">
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <About />
      {/* Popular Books */}
      <h4 className="text-2xl text-center font-primary">Popular Books</h4>
      <div className="flex justify-center gap-3 my-10">
        <PopularBookCard />
        <PopularBookCard />
        <PopularBookCard />
        <PopularBookCard />
        <PopularBookCard />
      </div>
      {/* Trending Category */}
      <div className="flex justify-around">
        <h4 className="text-2xl text-center font-primary">Trending Category</h4>
        <ViewMore />
      </div>
      <div className="flex justify-center mb-10">
        <div className="grid justify-center grid-cols-3 gap-5 my-5">
          <TrendingCategory />
        </div>
      </div>
      {/* Latest Book */}
      <div className="flex justify-around">
        <h4 className="text-2xl text-center font-primary">Latest Books</h4>
        <ViewMore />
      </div>
      <div className="flex justify-center gap-3 mt-5 mb-10">
        <LatestBookCard />
        <LatestBookCard />
        <LatestBookCard />
        <LatestBookCard />
        <LatestBookCard />
      </div>
      <NewPublishingBook  />
      {/* FAQ */}
      <h4 className="my-10 text-2xl text-center font-primary">FAQ</h4>
      <Faq />
    </div>
  );
};

export default HomePage;

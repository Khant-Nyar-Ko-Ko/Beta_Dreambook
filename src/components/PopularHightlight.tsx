/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useFetchPopularBook } from "@/hooks/useBookApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const PopularHighlight = () => {
  const { data: popularBook } = useFetchPopularBook();
  const [currentIndex, setCurrentIndex] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    if (popularBook) {
      gsap.to(`[data-id="${popularBook[currentIndex].id}"]`, {
        duration: 1,
        scale: 1,
      });

      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % popularBook.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [currentIndex, popularBook]);

  const handleNext = () => {
    if (!popularBook) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % popularBook.length);
  };

  const handlePrev = () => {
    if (!popularBook) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + popularBook.length) % popularBook.length
    );
  };

  const getClassNames = (index: number) => {
    if (index === currentIndex) return "active";
    if (index === (currentIndex - 1 + popularBook.length) % popularBook.length)
      return "before";
    if (index === (currentIndex + 1) % popularBook.length) return "after";
    return "";
  };

  const handleClick = (slug: string) => {
    navigate(`/readbook/${slug}`);
  };

  return (
    <motion.div initial={{x: 500}} animate={{x :0}} transition={{ duration: 1.5}} className="relative flex flex-col items-center justify-center w-full h-full">
      <button
        data-btn="prev"
        onClick={handlePrev}
        className="absolute left-0 z-20 px-4 py-10 bg-gray-200 rounded-full opacity-0"
      >
        {"<"}
      </button>
      <div className="relative flex items-center justify-center w-4/5 overflow-hidden h-80">
        {popularBook &&
          popularBook.map((book: any, index: number) => {
            const classNames = getClassNames(index);
            const zIndex =
              classNames === "active"
                ? "z-20"
                : classNames === "before" || classNames === "after"
                ? "z-10"
                : "z-0";

            const scale = classNames === "active" ? "scale-100" : "scale-55";
            const position =
              classNames === "before"
                ? `left-[180px]`
                : classNames === "after"
                ? `right-[150px]`
                : "left-[200px]";

            return (
              <div
                key={book.id}
                data-id={book.id}
                className={`absolute object-cover shadow-lg flex items-center justify-center transition-all duration-500 ${zIndex} ${scale} ${position}`}
                style={{
                  width: classNames === "active" ? "200px" : "150px",
                  height: classNames === "active" ? "300px" : "230px",
                  opacity: classNames === "active" ? 1 : 0.5,
                }}
              >
                <img
                  onClick={() => handleClick(book?.slug)}
                  src={book?.coverImg || ""}
                  alt={book?.title || "Image"}
                  className="object-cover w-full h-full rounded-lg shadow-lg cursor-pointer"
                />
              </div>
            );
          })}
      </div>
      <button
        data-btn="next"
        onClick={handleNext}
        className="absolute right-0 z-20 px-4 py-10 bg-gray-200 rounded-full opacity-0"
      >
        {">"}
      </button>
      <p className="z-10 py-3 text-black font-primary dark:text-white">
        Most Popular Books This Week
      </p>
    </motion.div>
  );
};

export default PopularHighlight;

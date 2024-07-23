/* eslint-disable @typescript-eslint/no-explicit-any */
// ChapterPagination.tsx
import { useChapterContext } from "@/contexts/ChapterContext";
import { Button } from "../ui/button";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { useState } from "react";
import ChapterDrawer from "./ChapterDrawer";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";

const ChapterPagination = () => {
  const {
    currentChapterIndex,
    chapters,
    handlePrevChapter,
    handleNextChapter,
    handleChapterClick
  } = useChapterContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  return (
    <>
    <div className="flex items-center justify-between px-5 md:px-20">
      <Button
        onClick={handlePrevChapter}
        className={currentChapterIndex === 0 ? "invisible" : "visible"}
        disabled={currentChapterIndex === 0}
      >
        <span className="block md:hidden">
        <TiArrowBack />
        </span>
        <span className="hidden md:block">Previous</span>
      </Button>
      <p className="text-black dark:text-white">
        {currentChapterIndex + 1} of {chapters.length}
      </p>
      <Button className="block border-none md:hidden" variant="outline" onClick={toggleDrawer}>
      <CiViewList size="24px" />
      </Button>
      <Button onClick={handleNextChapter}>
        {currentChapterIndex === chapters.length - 1 ? (
          <div>
            {" "}
            <span className="block md:hidden">
              {" "}
              <IoCheckmarkDoneSharp />
            </span>
            <span className="hidden md:block">Complete</span>
          </div>
        ) : (
          <div>
            {" "}
            <span className="block md:hidden">
            <TiArrowForward />
            </span>
            <span className="hidden md:block">Next</span>
          </div>
        )}
      </Button>
    </div>
    <ChapterDrawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
      <p className="pb-5 text-xl font-semibold text-black dark:text-white">
        Chapters
      </p>
      <div className="flex flex-col gap-3 h-[300px] overflow-y-auto">
      {chapters
        .sort((a: any, b: any) => a.chapterNum - b.chapterNum)
        .map((chapter: any, index: any) => (
          <button
            key={index}
            className={`px-2 text-left duration-300 rounded font-primary hover:bg-gray-200 hover:dark:bg-default ${
              currentChapterIndex === index
                ? "text-default hover:dark:text-black"
                : "text-black dark:text-white"
            }`}
            onClick={() => handleChapterClick(index)}
          >
            - {chapter.title}
          </button>
        ))}
      </div>
     
    </ChapterDrawer>
    </>
  );
};

export default ChapterPagination;

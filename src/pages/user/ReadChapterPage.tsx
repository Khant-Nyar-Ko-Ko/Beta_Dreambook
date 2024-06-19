/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChapter } from "@/api"; // Ensure this or useGetChapter is used, not both
import BackButton from "@/components/BackButton";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadChapterPage = () => {
  const { bookId } = useParams();
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);

  useEffect(() => {
    if (bookId) {
      setLoading(true);
      getChapter({ bookId })
        .then((chaptersData) => {
          setChapters(chaptersData);
          setCurrentChapterIndex(0);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch chapters:", error);
          setLoading(false);
        });
    }
  }, [bookId]);

  const handleChapterClick = (index: number) => {
    setCurrentChapterIndex(index);
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading variant="blue" />
      </div>
    );
  }

  const selectedChapter = chapters[currentChapterIndex];

  return (
    <div className="flex">
      <div className=" hidden md:flex flex-col w-1/5 h-[700px] gap-4 px-10 py-5 border-r-2">
        <BackButton />
        <p className="text-xl font-semibold">Chapters</p>
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            className={`px-2 text-left rounded font-primary hover:bg-gray-200 ${
              currentChapterIndex === index ? "text-default" : "text-black"
            }`}
            onClick={() => handleChapterClick(index)}
          >
            {chapter.title}
          </button>
        ))}
      </div>
      <div className="w-screen md:w-4/5">
        <div className="flex flex-col h-[600px] gap-5 px-20 py-10 overflow-scroll">
          {selectedChapter && (
            <>
              <h4 className="text-2xl font-semibold text-default"> 
                {selectedChapter.title}
              </h4>
              <p className="overflow-auto text-lg text-justify">
                {selectedChapter.content}
              </p>
            </>
          )}
        </div>
        <div className="flex items-center justify-between px-20">
          <Button
            onClick={handlePrevChapter}
            className={currentChapterIndex == 0 ? " invisible" : " visible"}
            disabled={currentChapterIndex === 0}
          >
            Previous
          </Button>
          <p>
            {currentChapterIndex + 1}/{chapters.length}
          </p>
          <Button
            onClick={handleNextChapter}
            disabled={currentChapterIndex === chapters.length - 1}
          >
            {currentChapterIndex == chapters.length - 1 ? " Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReadChapterPage;

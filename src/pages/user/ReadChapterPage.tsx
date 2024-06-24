/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChapter } from "@/api"; // Ensure this or useGetChapter is used, not both
import BackButton from "@/components/BackButton";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { usePostChapterProgress } from "@/hooks/useChapterProgressApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReadChapterPage = () => {
  const { bookId } = useParams();
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const {
    mutate: chapterProgress,
    isSuccess,
    isError,
    error,
  } = usePostChapterProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId) {
      setLoading(true);
      getChapter({ bookId })
        .then((chaptersData) => {
          setChapters(chaptersData);
          setCurrentChapterIndex(0);
          setLoading(false);
          chapterProgress({ bookId, chapterProgress: 1 });
        })
        .catch((error) => {
          console.error("Failed to fetch chapters:", error);
          setLoading(false);
        });
    }
  }, [bookId, chapterProgress]);

  const handleChapterClick = (index: number) => {
    setCurrentChapterIndex(index);
    chapterProgress({ bookId, chapterProgress: index + 1 });
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      chapterProgress({ bookId, chapterProgress: currentChapterIndex });
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      chapterProgress({ bookId, chapterProgress: currentChapterIndex + 2 });
      console.log(chapterProgress);
    } else {
      chapterProgress({ bookId, chapterProgress: 0 });
      navigate(`/readbook/${bookId}`);
    }
  };

  if (isSuccess) {
    console.log("Chapter progress updated successfully");
  }

  if (isError) {
    console.error("Failed to update chapter progress:", error);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading variant="blue" />
      </div>
    );
  }

  const selectedChapter = chapters[currentChapterIndex];

  return (
    <div className="flex bg-white dark:bg-darkMode1">
      <div className=" hidden md:flex flex-col w-1/5 h-[700px] gap-4 px-10 py-5 border-r-2 border-white dark:border-slate-700">
        <BackButton />
        <p className="text-xl font-semibold text-black dark:text-white">
          Chapters
        </p>
        {chapters.sort((a, b) => a.chapterNum - b.chapterNum).map((chapter, index) => (
          <button
            key={index}
            className={`px-2 text-left duration-300 rounded font-primary hover:bg-gray-200 hover:dark:bg-default ${
              currentChapterIndex === index
                ? "text-default hover:dark:text-black"
                : "text-black dark:text-white "
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
              <p className="overflow-auto text-lg text-justify text-black dark:text-white">
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
          <p className="text-black dark:text-white">
            {currentChapterIndex + 1}/{chapters.length}
          </p>
          <Button onClick={handleNextChapter}>
            {currentChapterIndex == chapters.length - 1 ? " Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReadChapterPage;

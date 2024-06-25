/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChapterContext } from "@/contexts/ChapterContext";
import BackButton from "../BackButton";
import { useParams } from "react-router-dom";

const ChapterSidebar = () => {
  const { chapters, currentChapterIndex, handleChapterClick } =
    useChapterContext();
  const { bookId } = useParams<{ bookId: string }>();

  return (
    <div className="hidden md:flex flex-col w-1/5 h-[700px] gap-4 px-10 py-5 border-r-2 border-white dark:border-slate-700">
      <BackButton backPath={`/readbook/${bookId}`} />
      <p className="text-xl font-semibold text-black dark:text-white">
        Chapters
      </p>
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
            {chapter.title}
          </button>
        ))}
    </div>
  );
};

export default ChapterSidebar;

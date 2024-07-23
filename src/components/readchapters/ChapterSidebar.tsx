/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChapterContext } from "@/contexts/ChapterContext";
import BackButton from "../tools/BackButton";
import { useParams } from "react-router-dom";

const ChapterSidebar = () => {
  const { chapters, currentChapterIndex, handleChapterClick } =
    useChapterContext();
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="hidden md:flex flex-col w-1/5 h-[700px] gap-4 px-10 py-5 border-r-2 overflow-y-auto border-white dark:border-slate-700">
      <BackButton backPath={`/readbook/${slug}`} />
      <p className="text-xl font-semibold text-black dark:text-white">
        Chapters
      </p>
      {chapters
        .sort((a: any, b: any) => a.chapterNum - b.chapterNum)
        .map((chapter: any, index: any) => (
          <button
            key={index}
            className={`px-2 text-left duration-300 rounded flex gap-1 font-primary hover:bg-gray-200 hover:dark:bg-default ${
              currentChapterIndex === index
                ? "text-default hover:dark:text-black"
                : "text-black dark:text-white"
            }`}
            onClick={() => handleChapterClick(index)}
          >
            <span className="text-sm">
            {chapter.chapterNum}
            </span>
            <span className="text-sm ">
            {chapter.title}
            </span>
          </button>
        ))}
    </div>
  );
};

export default ChapterSidebar;

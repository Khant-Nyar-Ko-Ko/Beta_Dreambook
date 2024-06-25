import { useChapterContext } from "@/contexts/ChapterContext";
import Loading from "../Loading";

const ChapterContent = () => {
  const { chapters, currentChapterIndex, loading } = useChapterContext();
  const selectedChapter = chapters[currentChapterIndex];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading variant="blue" />
      </div>
    );
  }

  return (
    <div className="w-screen select-none md:w-4/5">
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
    </div>
  );
};

export default ChapterContent;

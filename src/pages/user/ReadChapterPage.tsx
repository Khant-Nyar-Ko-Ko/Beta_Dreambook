/* eslint-disable @typescript-eslint/no-explicit-any */
import ChapterContent from "@/components/readchapters/ChapterContent";
import ChapterSidebar from "@/components/readchapters/ChapterSidebar";

const ReadChapterPage = () => {
  return (
    <div className="flex bg-white select-none dark:bg-darkMode1">
      <ChapterSidebar />
      <div className="w-screen md:w-4/5">
        <ChapterContent />
      </div>
    </div>
  );
};

export default ReadChapterPage;

// ChapterPagination.tsx
import { useChapterContext } from "@/contexts/ChapterContext";
import { Button } from "../ui/button";

const ChapterPagination = () => {
  const {
    currentChapterIndex,
    chapters,
    handlePrevChapter,
    handleNextChapter,
  } = useChapterContext();

  return (
    <div className="flex items-center justify-between px-5 md:px-20">
      <Button
        onClick={handlePrevChapter}
        className={currentChapterIndex === 0 ? "invisible" : "visible"}
        disabled={currentChapterIndex === 0}
      >
        Previous
      </Button>
      <p className="text-black dark:text-white">
        {currentChapterIndex + 1}/{chapters.length}
      </p>
      <Button onClick={handleNextChapter}>
        {currentChapterIndex === chapters.length - 1 ? "Complete" : "Next"}
      </Button>
    </div>
  );
};

export default ChapterPagination;

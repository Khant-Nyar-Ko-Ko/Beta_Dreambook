// ChapterContent.tsx
import { useChapterContext } from "@/contexts/ChapterContext";
import Loading from "../Loading";
import DOMPurify from "dompurify";
import ChapterPagination from "./ChapterPagination";

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
    <div className="flex flex-col justify-between h-[700px] md:h-[600px]">
      <div className="w-screen select-none md:w-4/5">
        <div className="flex flex-col w-full md:w-[1150px] h-[600px] gap-5 px-5 md:px-20 py-10 overflow-scroll">
          {selectedChapter && (
            <>
              <h4 className="font-semibold md:text-2xl text-default">
                {selectedChapter.title}
              </h4>
              <p
                className="overflow-auto text-sm text-justify text-black md:text-lg dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedChapter.content),
                }}
              ></p>
            </>
          )}
        </div>
      </div>
      <ChapterPagination />
    </div>
  );
};

export default ChapterContent;

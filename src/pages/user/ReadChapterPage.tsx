/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChapter } from "@/api";  // Ensure this or useGetChapter is used, not both
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadChapterPage = () => {
  const { bookId } = useParams();
  console.log("Book ID:", bookId); 

  const [chapter, setChapter] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookId) {
      setLoading(true);
      getChapter({ bookId }).then(chapterData => {
        console.log("Chapter Data:", chapterData);
        setChapter(chapterData);
        setLoading(false);
      }).catch(error => {
        console.error("Failed to fetch chapter:", error);
        setLoading(false);
      });
    } else {
      console.error("Book ID is undefined");
    }
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col w-1/5 h-[700px] gap-4 px-10 py-5 border-r-2">
        <BackButton />
        <p className="text-xl font-semibold font-primary">Chapters</p>
        {chapter?.map((chapter: any) => (
          <p key={chapter.id}>
            {chapter.id} : {chapter.title}
          </p>
        ))}
      </div>
      <div className="flex flex-col justify-between w-4/5 gap-5 px-20 py-10 h-[700px]">
        {/* Render first chapter details as an example */}
        {chapter.length > 0 && (
          <>
            <h4 className="text-2xl font-semibold font-primary text-default">
              {chapter[0].id} : {chapter[0].title}
            </h4>
            <p className="overflow-scroll text-lg text-justify font-primary">
              {chapter[0].content} {/* Assuming 'content' holds the chapter text */}
            </p>
          </>
        )}
        <div className="flex items-center justify-between">
          <Button>Previous</Button>
          <p>1/5</p> {/* Pagination or chapter navigation should be dynamic if applicable */}
          <Button>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default ReadChapterPage;

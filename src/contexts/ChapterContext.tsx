/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getChapter } from "@/api";
import { usePostChapterProgress } from "@/hooks/useChapterProgressApi";
import { useNavigate, useParams } from "react-router-dom";

const ChapterContext = createContext<any>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useChapterContext = () => useContext(ChapterContext);
export const ChapterProvider = ({ children }: { children: ReactNode }) => {
  const { bookId, chapterNum } = useParams();

  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    chapterNum ? parseInt(chapterNum, 10) - 1 : 0
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate: chapterProgress } = usePostChapterProgress();

  useEffect(() => {
    if (bookId) {
      setLoading(true);
      getChapter({ bookId })
        .then((chaptersData) => {
          setChapters(chaptersData);
          setLoading(false);
          chapterProgress({ bookId, chapterProgress: currentChapterIndex + 1 });
        })
        .catch((error) => {
          console.error("Failed to fetch chapters:", error);
          setLoading(false);
        });
    }
  }, [bookId, chapterProgress, currentChapterIndex]);

  const handleChapterClick = (index: number) => {
    setCurrentChapterIndex(index);
    chapterProgress({ bookId, chapterProgress: index + 1 });
    navigate(`/readchapter/${bookId}/${index + 1}`);
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      handleChapterClick(currentChapterIndex - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      handleChapterClick(currentChapterIndex + 1);
    } else {
      chapterProgress({ bookId, chapterProgress: 0 });
      navigate(`/readbook/${bookId}`);
    }
  };

  return (
    <ChapterContext.Provider
      value={{
        bookId,
        chapters,
        currentChapterIndex,
        handleChapterClick,
        handlePrevChapter,
        handleNextChapter,
        loading,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

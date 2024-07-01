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
  const { slug, chapterNum } = useParams();

  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    chapterNum ? parseInt(chapterNum, 10) - 1 : 1
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate: chapterProgress } = usePostChapterProgress();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getChapter({ slug })
        .then((chaptersData) => {
          setChapters(chaptersData);
          setLoading(false);
          chapterProgress({ slug, chapterProgress: currentChapterIndex + 1 });
        })
        .catch((error) => {
          console.error("Failed to fetch chapters:", error);
          setLoading(false);
        });
    }
  }, [slug, chapterProgress, currentChapterIndex]);

  const handleChapterClick = (index: number) => {
    setCurrentChapterIndex(index);
    chapterProgress({ slug: slug ?? "", chapterProgress: index + 1 });
    navigate(`/readchapter/${slug}/${index + 1}`);
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
      chapterProgress({ slug: slug ?? "", chapterProgress: 1 });
      navigate(`/readbook/${slug}`);
    }
  };

  return (
    <ChapterContext.Provider
      value={{
        slug,
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

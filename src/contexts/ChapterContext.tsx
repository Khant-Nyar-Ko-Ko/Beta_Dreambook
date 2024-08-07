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


interface EditState {
  id: number | null;
  status: boolean;
}


const ChapterContext = createContext<any>(null);

export const useChapterContext = () => useContext(ChapterContext);

export const ChapterProvider = ({ children }: { children: ReactNode }) => {
  const { slug, chapterNum } = useParams();
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    chapterNum ? parseInt(chapterNum, 10) - 1 : 0
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate: chapterProgress } = usePostChapterProgress();
  const [edit, setEdit] = useState<EditState>({ id: Number(chapterNum), status: false });

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getChapter({ slug })
        .then((chaptersData) => {
          setChapters(chaptersData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch chapters:", error);
          setLoading(false);
        });
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      chapterProgress({ slug, chapterProgress: currentChapterIndex + 1 });
    }
  }, [slug, currentChapterIndex, chapterProgress]);

  const handleChapterClick = (index: number) => {
    setCurrentChapterIndex(index);
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
        setEdit,
        edit,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};
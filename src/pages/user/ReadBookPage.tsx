import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { usePostHistory } from "@/hooks/useHistoryApi";
import { useFetchSingleBook } from "@/hooks/useBookApi";
import ProgressBar from "@ramonak/react-progress-bar";
import { getChapter } from "@/api";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReadComment from "@/components/readchapters/ReadComment";
import { usePostComment } from "@/hooks/useCommentApi";
import { useGetChapterProgress } from "@/hooks/useChapterProgressApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import BackButton from "@/components/tools/BackButton";
import RelatedBooks from "@/components/readbooks/RelatedBooks";
import { Loader2 } from "lucide-react";

const ReadBookPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [comment, setComment] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chapters, setChapters] = useState<any[]>([]);
  const navigate = useNavigate();

  const { data: singleBook, isLoading: isSingleBookLoading } =
    useFetchSingleBook(slug ?? "");
  const { data: progress, refetch: progressRefetch } = useGetChapterProgress(
    slug ?? ""
  );

  const queryClient = useQueryClient();

  console.log(singleBook);

  const {
    mutate: postComment,
    isSuccess: isCommentSuccess,
    isPending: isPendingComment,
  } = usePostComment();
  const {
    mutate: updateHistory,
    isSuccess: isHistorySuccess,
    isPending: isPendingHistory,
  } = usePostHistory();

  useEffect(() => {
    if (isCommentSuccess) {
      // refetchComments();
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCommentSuccess]);

  useEffect(() => {
    if (isHistorySuccess) {
      navigate(`/readchapter/${slug}/${currentBook.chapterProgress ?? 1}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHistorySuccess, navigate, slug]);

  useEffect(() => {
    progressRefetch();
  }, [progress, progressRefetch]);

  useEffect(() => {
    if (slug) {
      getChapter({ slug })
        .then((chaptersData) => setChapters(chaptersData))
        .catch((error) => console.error("Failed to fetch chapters:", error));
    }
  }, [slug]);

  if (isSingleBookLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-black bg-white dark:text-white dark:bg-darkMode1">
        Loading...
      </div>
    );
  }

  if (!singleBook || !progress) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-darkMode1">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const currentBook =
    progress && progress.length > 0 ? progress[0] : { chapterProgress: 1 };
  const percentageProgress =
    (Number(currentBook.chapterProgress) / chapters.length) * 100;

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const handleHistoryUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    updateHistory({ bookSlug: slug ?? "" });
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") {
      return toast.error("Comment Shouldn't be Empty!");
    }
    postComment({ bookSlug: slug ?? "", text: comment });
  };

  return (
    <div className="flex flex-col w-screen bg-white select-none md:flex-row dark:bg-darkMode1">
      <div className="sticky md:top-[100px] flex flex-col w-full md:w-4/5 px-10 md:px-[90px] py-5 h-[700px] overflow-y-scroll">
        <BackButton backPath={`/library`} />
        {singleBook && (
          <div className="relative flex flex-col items-center py-3 select-none px-[50px] md:items-start md:justify-between md:flex-row">
            <div className="hidden md:block absolute rounded-full bg-light w-44 h-44 z-[-1] top-5 left-22 px-20"></div>
            <img
              src={singleBook.coverImg as string}
              alt={singleBook?.title}
              className="w-40 h-auto md:ps-3"
            />
            <div>
              <div className="flex flex-col justify-center w-[300px] md:w-auto gap-5">
                <h1 className="mt-4 text-2xl font-bold text-black dark:text-white">
                  {singleBook?.title}
                </h1>
                <NavLink to={`/author-profile/${singleBook?.user?.name}`}>
                  <div className="flex items-center gap-1">
                    <img
                      src={singleBook?.user?.profileImg}
                      className="w-6 h-6 rounded-full"
                      alt={singleBook?.user?.name}
                    />
                    <p className="text-sm text-black font-primary dark:text-white">
                      By {singleBook?.user?.name}
                    </p>
                  </div>
                </NavLink>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1 text-black dark:text-white">
                    <p>Category :</p>
                    <img
                      src={singleBook?.category?.icon}
                      className="w-4 h-4"
                      alt=""
                    />
                    <p>{singleBook?.category?.title}</p>
                  </div>
                  <div className="flex items-center gap-2 text-black dark:text-white">
                    <p>
                      Keywords:{" "}
                      {singleBook?.keywords
                        ?.map((keyword: string) => keyword)
                        .join(", ")}
                    </p>
                  </div>
                </div>
                {currentBook.chapterProgress !== 1 && (
                  <div className="flex items-center gap-2">
                    <ProgressBar
                      completed={percentageProgress}
                      bgColor="#3A7AD5"
                      animateOnRender={true}
                      height="10px"
                      isLabelVisible={false}
                      width="200px"
                    />
                    <p className="text-black select-none dark:text-white font-primary">
                      {currentBook.chapterProgress}/{chapters.length}
                    </p>
                  </div>
                )}
                <Button
                  className="w-full md:w-[250px]"
                  onClick={handleHistoryUpdate}
                >
                  {isPendingHistory ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span>
                      {currentBook.chapterProgress < 2
                        ? "Start Reading"
                        : "Continue Reading"}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 my-10 text-black select-none dark:text-white">
          <p className="font-semibold md:text-xl font-primary">Book Overview</p>
          <div
            className="text-xs font-primary md:text-base"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(singleBook?.description),
            }}
          ></div>
        </div>
        <hr className="md:w-[900px] border-white dark:border-slate-700" />
        <div className="flex flex-col gap-5 my-5 text-black select-none dark:text-white">
          <p>Leave a comment</p>
          <form className="flex flex-col gap-5" onSubmit={handleCommentSubmit}>
            <Input
              className="w-full md:w-[250px] bg-white dark:bg-darkMode1 text-black dark:text-white"
              value={comment}
              onChange={handleCommentChange}
            />
            <Button
              className={`w-full md:w-[150px] ${
                isPendingComment && "disabled:"
              }`}
              type="submit"
            >
              {isPendingComment ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Post Comment"
              )}
            </Button>
          </form>
          <ReadComment />
        </div>
      </div>
      <RelatedBooks slug={singleBook.slug} />
    </div>
  );
};

export default ReadBookPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useFetchSingleBook } from "@/hooks/useBookApi";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import authorprofile from "../../assets/images/Author.png";
import { Input } from "@/components/ui/input";
import { useGetComment, usePostComment } from "@/hooks/useCommentApi";
import BackButton from "@/components/BackButton";
import ReadComment from "@/components/readchapters/ReadComment";
import RelatedBooks from "@/components/RelatedBooks";
import { useGetChapterProgress } from "@/hooks/useChapterProgressApi";
import ProgressBar from "@ramonak/react-progress-bar";
import { getChapter } from "@/api";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

const ReadBookPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [comment, setComment] = useState<string>("");
  const [chapters, setChapters] = useState<any[]>([]);

  const { data: singleBook, isLoading: isSingleBookLoading } =
    useFetchSingleBook(slug ?? "");
    console.log(singleBook);
    
  const { data: progress, isLoading: isProgressLoading } =
    useGetChapterProgress(slug ?? "");

  useEffect(() => {
    if (slug) {
      getChapter({slug} )
        .then((chaptersData) => {
          setChapters(chaptersData);
        })
        .catch((error) => {
          console.error("Failed to fetch chapters:", error);
        });
    }
  }, [slug]);



  const { data: readComment, refetch} = useGetComment(slug ?? "");
  const { mutate, isSuccess } = usePostComment();

  useEffect(() => {
    if (isSuccess) {
      console.log("Success! Calling refetch...");
      refetch();
    }
  }, [isSuccess, refetch]);
  
  useEffect(() => {
    console.log("Read comments:", readComment); 
  }, [readComment]);

  if (isSingleBookLoading) {
    return <div>Loading...</div>;
  }

  if (!singleBook) {
    return <div>No book data available</div>;
  }

  

  // console.log(singleBook);

  if (isProgressLoading) {
    return <div className="flex items-center justify-center h-[700px]">Loading...</div>;
  }

  // console.log(progress);

  const currentBook = progress && progress.length > 0 ? progress[0] : 1;
  // const currentBook = progress.find((book : any) => book.bookId === currentBookId);

  if (!currentBook || !progress) {
    return <div className="flex items-center justify-center h-[700px]">Loading...</div>;
  }

  const percentageProgress =
    currentBook && chapters.length > 0
      ? (Number(currentBook.chapterProgress) / chapters.length) * 100
      : 1;


 

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ bookId: Number(singleBook.id), text: comment });
    toast.success("Posted comment successfully")
    refetch();
    setComment("");
  };

  return (
    <div className="flex flex-col bg-white select-none md:flex-row dark:bg-darkMode1">
      <div className="  sticky md:top-[100px] flex flex-col w-full md:w-4/5 px-10 md:px-[200px] py-5 h-full">
        <BackButton backPath={`/library`} />
        {singleBook && (
          <div className="relative flex flex-col items-center py-3 select-none md:items-start md:justify-between md:flex-row">
            <div className=" hidden md:block absolute rounded-full bg-light w-44 h-44 z-[-1] top-5 left-0 px-20"></div>
            <img
              src={singleBook.coverImg as string}
              alt={singleBook?.title}
              className="w-40 h-auto md:ps-3"
            />
            <div>
              <div className="flex flex-col justify-center w-[300px] md:w-auto gap-5 ">
                <h1 className="mt-4 text-2xl font-bold text-black dark:text-white">
                  {singleBook?.title}
                </h1>
                <div className="flex items-center gap-1">
                  <img
                    src={authorprofile}
                    className="w-6 h-6 rounded-full"
                    alt="author"
                  />
                  <p className="text-sm text-black font-primary dark:text-white">
                    By {singleBook?.user?.name}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1 text-black dark:text-white">
                    <p> Category : </p>
                    <img
                      src={singleBook?.category?.icon}
                      className="w-4 h-4"
                      alt=""
                    />
                    <p>{singleBook?.category?.title}</p>
                  </div>
                  <div className="flex items-center gap-2 text-black dark:text-white">
                    <p> Keywords : </p>
                    <p>Keywords: {singleBook?.keywords?.map((keyword:string) => keyword).join(', ')}</p>
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
                      {currentBook.chapterProgress ? currentBook.chapterProgress : 0}/{chapters.length}
                    </p>
                  </div>
                )}

                <NavLink
                  to={`/readchapter/${slug}/${
                    currentBook.chapterProgress ?? 1
                  }`}
                >
                  <Button className=" w-full md:w-[250px]">
                    {currentBook.chapterProgress < 2
                      ? "Start Reading"
                      : "Continue Reading"}
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 my-10 text-black select-none dark:text-white">
          <p className="text-xl font-semibold font-primary ">Book Overview</p>
          <div
          className=" font-primary"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(singleBook?.description),
            }}
          ></div>
        </div>
        <hr className="md:w-[900px] border-white dark:border-slate-700" />
        <div className="flex flex-col gap-5 my-5 text-black select-none dark:text-white">
          <p>Leave a comment</p>
          <form className="flex flex-col gap-5 " onSubmit={submitHandler}>
            <Input
              className="w-full md:w-[250px] bg-white dark:bg-darkMode1 text-black dark:text-white"
              value={comment}
              onChange={handleComment}
            />
            <Button type="submit" className=" w-full md:w-[250px]">
              Post Comment
            </Button>
          </form>
        </div>
        <ReadComment readComment={readComment} />
      </div>
      <RelatedBooks slug={singleBook.slug} />
    </div>
  );
};

export default ReadBookPage;

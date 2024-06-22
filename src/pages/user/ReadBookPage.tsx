/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useFetchSingleBook } from "@/hooks/useBookApi";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import authorprofile from "../../assets/images/Author.png";
import { Input } from "@/components/ui/input";
// import Card from "@/components/Card";
import { usePostComment } from "@/hooks/useCommentApi";
import BackButton from "@/components/BackButton";
import ReadComment from "@/components/readchapters/ReadComment";
import RelatedBooks from "@/components/RelatedBooks";

const ReadBookPage = () => {
  const { bookId } = useParams<{ bookId: any }>();
  const [comment, setComment] = useState<string>("");

  const { data: singleBook, isLoading } = useFetchSingleBook(bookId ?? "");

  const { mutate } = usePostComment();
  if (isLoading || !singleBook) {
    return <div>Loading...</div>; // or a loading spinner
  }
  


  

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ bookId: Number(bookId), text: comment });
    setComment("");
  };

  return (
    <div className="flex flex-col bg-white md:flex-row dark:bg-darkMode1">
      <div className="  sticky md:top-[100px] flex flex-col w-full md:w-4/5 px-10 md:px-[200px] py-5 h-full">
        <BackButton />
        {singleBook && (
          <div className="relative flex flex-col items-center py-3 md:items-start md:justify-between md:flex-row">
            <div className=" hidden md:block absolute rounded-full bg-light w-44 h-44 z-[-1] top-5 left-0 px-20"></div>
            <img
              src={singleBook.coverImg as string}
              alt={singleBook?.title}
              className="w-40 h-auto md:ps-3"
            />
            <div>
              <div className="flex flex-col justify-center w-[300px] md:w-auto gap-5 ">
                <h1 className="mt-4 text-2xl font-bold text-black dark:text-white">{singleBook?.title}</h1>
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
                    <p>{singleBook?.keywords}</p>
                  </div>
                </div>
                <NavLink to={`/readchapter/${singleBook.id}`}>
                  <Button className=" w-full md:w-[250px]">Start Reading</Button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 my-10 text-black dark:text-white">
          <p className="text-xl font-semibold font-primary ">Book Overview</p>
          <p>{singleBook?.description}</p>
        </div>
        <hr className="md:w-[900px] border-white dark:border-slate-700" />
        <div className="flex flex-col gap-5 my-5 text-black dark:text-white">
          <p>Leave a comment</p>
          <form className="flex flex-col gap-5 " onSubmit={submitHandler}>
            <Input  className="w-full md:w-[250px] bg-white dark:bg-darkMode1 text-black dark:text-white" value={comment} onChange={handleComment} />
            <Button type="submit" className=" w-full md:w-[250px]">
              Post Comment
            </Button>
          </form>
        </div>
        <ReadComment bookId={bookId}/>
      </div>
      <RelatedBooks bookId={bookId}/>
    </div>
  );
};

export default ReadBookPage;

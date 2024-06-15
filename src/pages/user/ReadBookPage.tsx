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

const ReadBookPage = () => {
  const { bookId } = useParams<{ bookId: any }>();
  console.log("ReadBookPage - Book ID:", bookId);
  // const [book, setBook] = useState<any>(null);
  // const [relateBook, setRelateBook] = useState<any>([]);
  const [comment, setComment] = useState<string>("");

  const { data: singleBook } = useFetchSingleBook(bookId ?? "");
  console.log(bookId);

  const { mutate } = usePostComment();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ bookId: Number(bookId), text: comment });
    setComment("");
  };

  return (
    <div className="flex">
      <div className="  sticky top-[100px] flex flex-col w-4/5 px-[200px] py-5 h-full ">
        <BackButton />
        {singleBook && (
          <div className="relative flex justify-between py-3">
            <div className="absolute rounded-full bg-light w-44 h-44 z-[-1] top-5 left-0 px-20"></div>
            <img
              src={singleBook.coverImg as string}
              alt={singleBook?.title}
              className="w-40 h-auto ps-3"
            />
            <div>
              <div className="flex flex-col gap-5">
                <h1 className="mt-4 text-2xl font-bold">{singleBook?.title}</h1>
                <div className="flex items-center gap-1">
                  <img
                    src={authorprofile}
                    className="w-6 h-6 rounded-full"
                    alt="author"
                  />
                  <p className="text-sm font-primary">
                    By {singleBook?.user?.name}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <p> Category : </p>
                    <img
                      src={singleBook?.category?.icon}
                      className="w-4 h-4"
                      alt=""
                    />
                    <p>{singleBook?.category?.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p> Keywords : </p>
                    <p>{singleBook?.keywords}</p>
                  </div>
                </div>
                <NavLink to={`/readchapter/${singleBook.id}`}>
                  <Button>Start Reading</Button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 my-10">
          <p className="text-xl font-semibold font-primary">Book Overview</p>
          <p>{singleBook?.description}</p>
        </div>
        <hr className="w-[900px]" />
        <div className="flex flex-col gap-5 my-5">
          <p>Leave a comment</p>
          <form className="flex flex-col gap-5 " onSubmit={submitHandler}>
            <Input value={comment} onChange={handleComment} />
            <Button type="submit" className=" w-[150px]">
              Post Comment
            </Button>
          </form>
        </div>
      </div>
      <div className="flex flex-col w-1/5 gap-3 overflow-scroll border-l-2">
        <p className="px-5 py-5 font-semibold font-primary">Related Books</p>
        {/* <div className="flex flex-col gap-5 px-5">
          {relateBook.map(
            ({
              id,
              title,
              coverImg,
              category,
              user,
            }: {
              id: any;
              title: string;
              coverImg: string;
              category: any;
              user: any;
            }) => {
              const { name } = user;

              return (
                <Card
                  key={id}
                  id={id}
                  title={title}
                  image={coverImg}
                  categorylogo={category?.icon}
                  categorytitle={category?.title}
                  author={name}
                />
              );
            }
          )}
        </div> */}
      </div>
    </div>
  );
};

export default ReadBookPage;

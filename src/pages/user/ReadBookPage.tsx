/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useFetchBooks } from "@/hooks/useBookApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import authorprofile from "../../assets/images/Author.png";
import { Input } from "@/components/ui/input";
import Card from "@/components/Card";
import { usePostComment } from "@/hooks/useCommentApi";

const ReadBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const navigate = useNavigate();
  const [relateBook, setRelateBook] = useState<any>([]);
  const [comment, setComment] = useState<string>("");

  const { data: books } = useFetchBooks();
  const { mutate } = usePostComment();

  const handleBack = () => {
    navigate('/');
  };

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ bookId: Number(id), text: comment });
    setComment('');
  };

  useEffect(() => {
    if (books) {
      const selectedBook = books?.items.find(
        (book: any) => book?.id === Number(id)
      );
      setBook(selectedBook || null);

      const relatedBook = books?.items.filter(
        (book: any) =>
          book.categoryId === selectedBook.categoryId &&
          book.id !== selectedBook.id
      );
      setRelateBook(relatedBook);
    }
  }, [books, id]);

  return (
    <div className="flex">
      <div className="  sticky top-[100px] flex flex-col w-3/4 px-[150px] py-5 h-full ">
        <div
          className="flex items-center justify-start cursor-pointer text-default"
          onClick={handleBack}
        >
          <IoIosArrowRoundBack size="30" />
          <Button variant="ghost" className="text-default">
            Back
          </Button>
        </div>
        {book && (
          <div className="relative flex justify-between py-3">
            <div className="absolute rounded-full bg-light w-44 h-44 z-[-1] top-5 left-0 px-20"></div>
            <img
              src={book.coverImg as string}
              alt={book?.title}
              className="w-40 h-auto ps-3"
            />
            <div>
              <div className="flex flex-col gap-5">
                <h1 className="mt-4 text-2xl font-bold">{book?.title}</h1>
                <div className="flex items-center gap-1">
                  <img
                    src={authorprofile}
                    className="w-6 h-6 rounded-full"
                    alt="author"
                  />
                  <p className="text-sm font-primary">By {book?.user?.name}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <p> Category : </p>
                    <img
                      src={book?.category?.icon}
                      className="w-4 h-4"
                      alt=""
                    />
                    <p>{book?.category?.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p> Keywords : </p>
                    <p>{book?.keywords}</p>
                  </div>
                </div>
                <Button>Start Reading</Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 my-10">
          <p className="text-xl font-semibold font-primary">Book Overview</p>
          <p>{book?.description}</p>
        </div>
        <hr />
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
      <div className="flex flex-col gap-3 overflow-scroll border-l-2">
        <p className="py-5 font-semibold px-28 font-primary">Related Books</p>
        <div className="flex flex-col gap-5 px-28">
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
        </div>
      </div>
    </div>
  );
};

export default ReadBookPage;

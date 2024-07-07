/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetComment } from "@/hooks/useCommentApi";
import { useParams } from "react-router-dom";
import profile from "../assets/images/defaultcontact.jpeg";
import ReplyComment from "./ReplyComment";
import Loading from "./Loading";
import BookStatusButton from "./BookStatusButton";

const Comment = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: comments, isPending } = useGetComment(slug ?? "");
  console.log(comments);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (isPending) {
    return (
      <div className=" flex justify-center items-center w-full h-[700] bg-white dark:bg-darkMode1">
        <Loading variant="blue" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-4/5 h-auto bg-white font-primary dark:bg-darkMode1">
          <BookStatusButton text={"Comments"}/>
      <div className="flex flex-col items-center justify-start mx-auto text-center ">
        {comments?.length > 0 ? (
          <>
            {comments?.map((comment: any) => (
              <div
                key={comment.id}
                className="w-[1000px] flex flex-col gap-3 text-black dark:text-white max-h-[600px] overflow-y-auto"
              >
                <div className="flex flex-col h-auto gap-3 py-3 my-5 border rounded ">
                  <div className="flex items-center justify-between px-5">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          comment.user.profileImg
                            ? comment.user.profileImg
                            : profile
                        }
                        className="w-6 h-6 rounded-full"
                        alt="#"
                      />
                      <p>
                        {comment.user.name ? comment.user.name : "Unknown User"}
                      </p>
                    </div>
                    <ReplyComment />
                  </div>
                  <p className="px-5 text-start font-primary">{comment.text}</p>
                  <p className="px-5 text-xs font-thin text-start opacity-60">
                    {" "}
                    {comment ? formatDate(comment.updatedAt) : "No date"}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center my-[100px]">
              <iframe
                src="https://lottie.host/embed/8866455b-434f-412d-863b-334f6c5c5724/EzyvqFxRUM.json"
                className="w-32 h-32"
                title="Animation"
              ></iframe>
              <h1 className="mt-3 text-2xl font-normal text-black dark:text-white">No Comments!</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetComment } from "@/hooks/useCommentApi";
import { useParams } from "react-router-dom";
import profile from "../assets/images/defaultcontact.jpeg";
import BookStatusButton from "./BookStatusButton";
import InfiniteScroll from "react-infinite-scroll-component";
import BookDetailMobile from "./BookDetailMobile";
import Loading from "./Loading/Loading";
import CommentMenu from "./bookdetails/CommentMenu";
import ReplyComment from "./ReplyComment";
import { useCommentContext } from "@/contexts/CommentContext";
import SeeReplyComment from "./readchapters/SeeReplyComment";
import { useUserApi } from "@/hooks/useUserApi";
import { getToken } from "@/service/authService";

const Comment = () => {
  const { slug } = useParams<{ slug: string }>();
  const token = getToken();
  
  const { data, fetchNextPage, hasNextPage } = useGetComment(slug ?? "");
  const comments = data?.pages.flatMap((page) => page.items) || [];
  const { reply } = useCommentContext();
  const { data: user } = useUserApi(token ?? "");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  console.log("comments:", comments);

  return (
    <div className="flex flex-col w-full h-auto bg-white md:w-4/5 font-primary dark:bg-darkMode1">
      <BookDetailMobile />
      <BookStatusButton text={"Comments"} />
      <div
        id="scrollableDiv"
        className="flex flex-col items-center justify-start mx-auto overflow-y-auto h-[700px] text-center "
      >
        {comments.length > 0 ? (
          <>
            <InfiniteScroll
              dataLength={comments.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={
                <h4>
                  <Loading />
                </h4>
              }
              scrollableTarget="scrollableDiv"
            >
              {comments?.map((comment: any) => (
                <div
                  key={comment.id}
                  className=" w-[350px] md:w-[1000px] flex flex-col gap-1 text-black dark:text-white max-h-[600px] overflow-y-auto"
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
                          {comment.user.name
                            ? comment.user.name
                            : "Unknown User"}
                        </p>
                      </div>
                      <CommentMenu id={comment?.id} />
                    </div>
                    <p className="px-5 text-start font-primary">
                      {comment.text}
                    </p>
                    <p className="px-5 text-xs font-thin text-start opacity-60">
                      {" "}
                      {comment ? formatDate(comment.updatedAt) : "No date"}
                    </p>
                  </div>
                  {reply.id === comment.id && reply.status && (
                    <ReplyComment parentId={comment.id} />
                  )}
                  {reply && <SeeReplyComment
                    profileImg={user?.profileImg}
                    name={user?.name}
                    parentId={comment.id}
                  />}
                  
                </div>
              ))}
            </InfiniteScroll>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center my-[100px]">
              <iframe
                src="https://lottie.host/embed/8866455b-434f-412d-863b-334f6c5c5724/EzyvqFxRUM.json"
                className="w-32 h-32"
                title="Animation"
              ></iframe>
              <h1 className="mt-3 text-2xl font-normal text-black dark:text-white">
                No Comments!
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;

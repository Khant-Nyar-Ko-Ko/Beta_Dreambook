/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetComment } from "@/hooks/useCommentApi";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import ReplyComment from "../ReplyComment";
import SeeReplyComment from "./SeeReplyComment";
import { getToken } from "@/service/authService";
import { useUserApi } from "@/hooks/useUserApi";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";

const ReadComment = () => {
  const { slug } = useParams<{ slug: string }>();
  const token = getToken();
  const [loadComment, setLoadComment] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isReply, setIsReply] = useState<{ [key: string]: boolean }>({});

  const { data: comments, refetch: refetchGetComment } = useGetComment(
    slug ?? "",
    page
  );

  useEffect(() => {
    if (comments) {
      setLoadComment((prevComments) => [...prevComments, ...comments.items]);
    }
  }, [comments]);

  const { data: user } = useUserApi(token ?? "");

  const fetchData = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    refetchGetComment();
  }, [page, refetchGetComment]);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleReplyToggle = (commentId: string) => {
    setIsReply((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleSendReply = (commentId: string) => {
    console.log("Reply sent for comment ID:", commentId);
    setIsReply((prev) => ({ ...prev, [commentId]: false }));
  };

  return (
    <div className="w-full my-10 select-none">
      <h4 className="flex items-center gap-1 text-xl font-semibold text-black font-primary dark:text-white">
        <p>Reader's Review </p>
        <span className="px-1 mx-2 text-sm text-white rounded-full font-primary bg-default">
          {comments?.meta?.totalItems}
        </span>
      </h4>
      <div id="scrollableDiv" className="overflow-y-auto h-[300px]">
      {comments?.meta?.totalItems > 0 && (
          <InfiniteScroll
            dataLength={loadComment.length}
            next={fetchData}
            hasMore={loadComment.length < comments?.meta?.totalItems}
            loader={<Loading/>}
            scrollableTarget="scrollableDiv"
          >
            {loadComment.map((comment: any) => (
              <div  key={comment?.id} className="flex gap-3 my-3">
                <img
                  src={comment?.user?.profileImg}
                  className="w-12 h-12 rounded-full "
                  alt={comment?.user?.name}
                />
                <div className="flex flex-col items-start gap-2 text-black dark:text-white">
                  <div>
                    <p className="text-lg font-primary">
                      {comment?.user?.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-primary">
                      {comment ? formatDate(comment.updatedAt) : "No date"}
                    </p>
                  </div>
                  <p className="text-xs md:text-base font-primary">
                    {comment.text}
                  </p>
                  {!isReply[comment.id] ? (
                    <Button
                      variant="white"
                      size="sm"
                      onClick={() => handleReplyToggle(comment.id)}
                    >
                      Reply
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <img
                        src={comment?.user?.profileImg}
                        className="w-8 h-8 rounded-full "
                        onClick={() => handleReplyToggle(comment.id)}
                        alt=""
                      />
                      <ReplyComment
                        parentId={comment.id}
                        handleSendReply={() => handleSendReply(comment.id)}
                      />
                    </div>
                  )}
                  {isReply[comment.id] &&  <SeeReplyComment
                    profileImg={user?.profileImg}
                    name={user?.name}
                    parentId={comment.id}
                  />}
                 
                </div>
              </div>
            ))}
            
          </InfiniteScroll>
      )}
      </div>
    </div>
  );
};

export default ReadComment;

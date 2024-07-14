/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "../ui/button";
// import { useEffect, useState } from "react";
// import { useUserApi } from "@/hooks/useUserApi";
// import { getToken } from "@/service/authService";
// import ReplyComment from "./ReplyComment";
// import SeeReplyComment from "./SeeReplyComment";
// import { useParams } from "react-router-dom";
// import { useGetComment } from "@/hooks/useCommentApi";
// import toast from "react-hot-toast";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Loading from "../Loading";

import { useGetComment } from "@/hooks/useCommentApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import ReplyComment from "../ReplyComment";
import SeeReplyComment from "./SeeReplyComment";
import { getToken } from "@/service/authService";
import { useUserApi } from "@/hooks/useUserApi";

const ReadComment = () => {
  const { slug } = useParams<{ slug: string }>();
  const token = getToken();
  const [page, setPage] = useState(1);
  const [isReply, setIsReply] = useState<{ [key: string]: boolean }>({});
  console.log(setPage);

  const { data: comments } = useGetComment(slug ?? "", page);
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

  const handleReplyToggle = (commentId: string) => {
    setIsReply((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleSendReply = (commentId: string) => {
    console.log("Reply sent for comment ID:", commentId);
    setIsReply((prev) => ({ ...prev, [commentId]: false }));
  };

  return (
    <div className="my-10 select-none ">
      <h4 className="flex items-center gap-1 text-xl font-semibold text-black font-primary dark:text-white">
        <p>Reader's Review </p>
        <span className="px-1 mx-2 text-sm text-white rounded-full font-primary bg-default">
          {comments?.meta?.totalItems}
        </span>
      </h4>
      {comments?.meta?.totalItems > 0 && (
        <div className=" overflow-y-auto h-[300px]">
          {comments?.items.map((comment: any) => (
            <div key={comment?.id} className="flex gap-3 my-3">
              <img
                src={comment?.user?.profileImg}
                className="w-12 h-12 rounded-full "
                alt={comment?.user?.name}
              />
              <div className="flex flex-col items-start gap-2 text-black dark:text-white">
                <div>
                  <p className="text-lg font-primary">{comment?.user?.name}</p>
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
                <SeeReplyComment
                   profileImg={user?.profileImg}
                   name={user?.name}
                   parentId={comment.id}
                 />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadComment;

// const ReadComment = () => {
//   const { slug } = useParams<{ slug: string }>();

//   const [comments, setComments] = useState<Comment[]>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [isReply, setIsReply] = useState<{ [key: string]: boolean }>({});
//   const token = getToken();

//   const { data: user } = useUserApi(token ?? "");

//   const { data, isError } = useGetComment(slug ?? "", page);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       setComments((prevComments) => [...prevComments,...data] as typeof data);
//     }
//   }, [data]);

//   const fetchMoreData = async () => {
//     // if (isLoading) return; // prevent multiple requests
//     try {
//       setPage((prevPage) => prevPage + 1);
//       const newData = await useGetComment(slug?? "", page + 1);
//       if (newData.length > 0) {
//         setComments((prevComments) => [...prevComments,...newData] as typeof newData);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching more comments:", error);
//       toast.error("Failed to load more comments");
//       setHasMore(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     return date.toLocaleDateString("en-US", options);
//   };

//   const handleReplyToggle = (commentId: string) => {
//     setIsReply((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
//   };

//   const handleSendReply = (commentId: string) => {
//     console.log("Reply sent for comment ID:", commentId);
//     setIsReply((prev) => ({ ...prev, [commentId]: false }));
//   };

//   if (isError) {
//     toast.error("Failed to load comments");
//     return null;
//   }
//   console.log(comments);

//   return (
//     <div className="my-10 select-none">
//       <h4 className="flex items-center gap-1 text-xl font-semibold text-black font-primary dark:text-white">
//         <p>Reader's Review </p>
//         <span className="px-1 mx-2 text-sm text-white rounded-full font-primary bg-default">
//           {comments?.length}
//         </span>
//       </h4>
//       <InfiniteScroll
//         dataLength={comments.length}
//         next={fetchMoreData}
//         hasMore={hasMore}
//         loader={<Loading />}
//       >
//         <div className="overflow-y-auto h-[300px]">
//           { comments.length &&  comments?.items?.map((comment: any) => (
//             <div key={comment.id} className="flex gap-3 my-3">
//               <img
//                 src={comment?.user?.profileImg}
//                 className="w-12 h-12 rounded-full "
//                 alt={comment?.user?.name}
//               />
//               <div className="flex flex-col items-start gap-2 text-black dark:text-white">
//                 <div>
//                   <p className="text-lg font-primary">{comment?.user?.name}</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-300 font-primary">
//                     {comment ? formatDate(comment.updatedAt) : "No date"}
//                   </p>
//                 </div>
//                 <p className="text-xs md:text-base font-primary">
//                   {comment.text}
//                 </p>
//                 {!isReply[comment.id] ? (
//                   <Button
//                     variant="white"
//                     size="sm"
//                     onClick={() => handleReplyToggle(comment.id)}
//                   >
//                     Reply
//                   </Button>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <img
//                       src={user?.profileImg}
//                       className="w-8 h-8 rounded-full "
//                       onClick={() => handleReplyToggle(comment.id)}
//                       alt=""
//                     />
//                     <ReplyComment
//                       parentId={comment.id}
//                       handleSendReply={() => handleSendReply(comment.id)}
//                     />
//                   </div>
//                 )}
//                 <SeeReplyComment
//                   profileImg={user?.profileImg}
//                   name={user?.name}
//                   parentId={comment.id}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default ReadComment;

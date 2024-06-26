import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ReadComment = ({readComment }: { readComment: any }) => {
  const [comments, setComments] = useState(readComment || []);

  const loadMore = () => {
    console.log("Loading more comments...");
  };
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    console.log("ReadComment updated:", readComment);
    if (readComment) {
      setComments(readComment);
    }
  }, [readComment]);
  

  return (
    <div className="my-10 select-none">
      <h4 className="text-xl font-semibold text-black font-primary dark:text-white">
        Reader's Review{" "}
        <span className="px-1 mx-2 rounded-full bg-lighter text-default">
          {readComment?.length}
        </span>
      </h4>
      {/* <div className=" overflow-y-auto h-[300px]"> */}
      <InfiniteScroll
        dataLength={comments.length}
        next={loadMore}
        hasMore={true} 
        loader={<h4 className="text-black dark:text-white">Loading...</h4>}
        endMessage={<p className="text-black dark:text-white">No more comments.</p>} 
        style={{ overflowY: "auto", height: 300 }}
      >
     
      {comments?.map((comment: any) => (
        <div key={comment.id} className="flex gap-3 my-3">
          <img
            src={comment?.user?.profileImg}
            className="w-12 h-12 rounded-full "
            alt={comment?.user?.name}
          />
          <div className="flex flex-col items-start gap-2 text-black dark:text-white">
            <div>
              <p className="text-lg font-primary">{comment?.user?.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-primary">
                {" "}
                {comment ? formatDate(comment.updatedAt) : "No date"}
              </p>
            </div>
            <p className="text-xs md:text-base font-primary">{comment.text}</p>
            <Button variant="white" size="sm">Reply</Button>
          </div>
        </div>
      ))}
      </InfiniteScroll>
       {/* </div> */}
    </div>
  );
};

export default ReadComment;

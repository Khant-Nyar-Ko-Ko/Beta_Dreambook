import { useGetComment } from "@/hooks/useCommentApi";
import { Button } from "../ui/button";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ReadComment = ({ bookId }: { bookId: any }) => {
  const { data: readComment } = useGetComment(bookId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="my-10 select-none ">
      <h4 className="text-xl font-semibold text-black font-primary dark:text-white">
        Reader's Review{" "}
        <span className="px-1 mx-2 rounded-full bg-lighter text-default">
          {readComment?.length}
        </span>
      </h4>
      {readComment?.map((comment: any) => (
        <div key={comment.id} className="flex gap-3 my-3">
          <img
            src={comment?.user?.profileImg}
            className="w-12 h-12 rounded-full "
            alt={comment?.user?.name}
          />
          <div className="flex flex-col items-start gap-2 text-black dark:text-white">
            <div>
              <p className="text-lg font-primary">{comment?.user?.name}</p>
              <p className="text-sm text-gray-600 font-primary">
                {" "}
                {comment ? formatDate(comment.updatedAt) : "No date"}
              </p>
            </div>
            <p className="text-xs md:text-base font-primary">{comment.text} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint voluptatibus ipsum vel. Vel incidunt quidem aperiam tempora omnis! Amet repellendus error vero itaque debitis sequi ex, praesentium corrupti repellat totam. </p>
            <Button variant="white" size="sm">Reply</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadComment;

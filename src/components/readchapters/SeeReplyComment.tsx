/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCountReply, useGetReply } from "@/hooks/useCommentApi";
import { useState } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import Loading from "../Loading";

const SeeReplyComment = ({
  profileImg,
  name,
  parentId,
}: {
  profileImg: string;
  name: string;
  parentId: number;
}) => {
  const { data: replyCmt } = useGetReply(parentId);
  const {data : countReply, isPending : countPending} = useCountReply(parentId);
  const [isSeeReply, setIsSeeReply] = useState<boolean>(false);
  console.log(replyCmt);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleSeeReply = () => {
    setIsSeeReply(!isSeeReply);
  }
  
  if(countPending){
    return <Loading/>
  }

  return (
    <>
    {countReply !== 0 ?     <div onClick={handleSeeReply}>
      {!isSeeReply ? (
        <div className="flex items-center gap-2 ">
          <BsFillReplyFill />
          <img src={profileImg} className="w-6 h-6 rounded-full " alt="" />
          <p className="text-sm font-primary opacity-80">
            {name} <span className="font-semibold ">replied</span>
          </p>
        </div>
      ) : (
        <div>
          {replyCmt?.map((reply: any) => (
            <div key={reply.id} className="flex gap-3 my-3">
              <img
                src={reply?.user?.profileImg}
                className="w-10 h-10 rounded-full "
                alt={reply?.user?.name}
              />
              <div className="flex flex-col items-start gap-2 text-black dark:text-white">
                <div>
                  <p className="text-base font-primary">{reply?.user?.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-primary">
                    {reply ? formatDate(reply.updatedAt) : "No date"}
                  </p>
                </div>
                <p className="text-xs md:text-sm font-primary">{reply?.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>: "" }

    </>
  );
};

export default SeeReplyComment;

import { useReplyComment } from "@/hooks/useCommentApi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useCommentContext } from "@/contexts/CommentContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const ReplyComment = ({ parentId }: { parentId: number }) => {
  const { id } = useParams();
  const [replyText, setReplyText] = useState("");
  const { mutate: reply, isPending: isPendingReply, isSuccess: isSuccessReply } = useReplyComment();
  const { setReply } = useCommentContext();
  const queryClient = useQueryClient();

  const onSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim() === "") {
      return toast.error("Comment Shouldn't be Empty!");
    }
    reply(
      { parentId, text: replyText },
      {
        onSuccess: () => {
          setReplyText("");
          // Optional: Add any additional success logic here
        },
      }
    );
  };

  const toggleReply = () => {
    setReply((prev: { id: number | null; status: boolean }) => ({
      id,
      status: !prev.status,
    }));
  };

  useEffect(() => {
    if (isSuccessReply) {
      toggleReply();
      queryClient.invalidateQueries( {queryKey: ['reply', parentId]});
      queryClient.invalidateQueries({queryKey:['comments'] });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessReply, queryClient, parentId]);

  return (
    <form
      onSubmit={onSendReply}
      className="flex items-center justify-between gap-1 px-2 py-1 border rounded"
    >
      <Input
        variant="reply"
        value={replyText}
        placeholder="Reply"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setReplyText(e.target.value)
        }
      />
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={toggleReply} variant="outline">
          Cancel
        </Button>
        <Button type="submit" size="sm">
          {isPendingReply ? <Loader2 className="animate-spin" /> : "Send"}
          <FaReply />
        </Button>
      </div>
    </form>
  );
};

export default ReplyComment;

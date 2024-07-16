import { useReplyComment } from "@/hooks/useCommentApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Loading from "./Loading";
import { FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useCommentContext } from "@/contexts/CommentContext";

const ReplyComment = ({ parentId }: { parentId: number}) => {
    const {id} = useParams();
    const [replyText, setReplyText] = useState("");
    const { mutate: reply, isPending : isPendingReply } = useReplyComment();
    const {setReply} = useCommentContext();

    const onSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyText.trim() === "") {
            return toast.error("Comment Shouldn't be Empty!"); 
        }
        reply({ parentId, text: replyText }, {
            onSuccess: () => {
                setReplyText(""); 
                // handleSendReply();
            }
        });
    }

    const toggleReply = () => {
        setReply((prev: {id : number| null; status : boolean}) => ({
            id, status : !prev.status
          }))
      }

    return (
        <form onSubmit={onSendReply} className="flex items-center justify-between gap-1 px-2 py-1 border rounded">
            <Input variant="reply" value={replyText} placeholder="Reply" onChange={e => setReplyText(e.target.value)} />
            <div className="flex items-center gap-2">
            <Button size="sm" onClick={toggleReply} variant="outline">Cancel</Button>
            <Button type="submit" size="sm">
                {isPendingReply ? <Loading/> : "Send"}
                <FaReply />
            </Button>
            </div>
        </form>
    );
};

export default ReplyComment;
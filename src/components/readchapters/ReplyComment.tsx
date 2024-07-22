import { useReplyComment } from "@/hooks/useCommentApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ReplyComment = ({ parentId, handleSendReply }: { parentId: number, handleSendReply: () => void }) => {
    const [replyText, setReplyText] = useState("");
    const { mutate: reply, isPending : isPendingReply } = useReplyComment();

    const onSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyText.trim() === "") {
            return toast.error("Comment Shouldn't be Empty!"); 
        }
        reply({ parentId, text: replyText }, {
            onSuccess: () => {
                setReplyText(""); 
                handleSendReply();
            }
        });
    }

    return (
        <form onSubmit={onSendReply} className="flex items-center gap-1 px-2 py-1 border rounded">
            <Input variant="reply" value={replyText} onChange={e => setReplyText(e.target.value)} />
            <Button type="submit" size="sm">
                {isPendingReply ? <Loader2 className="animate-spin"/> : "Send"}
            </Button>
        </form>
    );
};

export default ReplyComment;

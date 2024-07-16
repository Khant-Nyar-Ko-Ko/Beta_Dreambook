/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from "react";
import { useParams } from "react-router-dom";

interface EditState {
  id: number | null;
  status: boolean;
}

const CommentContext = createContext<any>(null);

export const useCommentContext = () => useContext(CommentContext);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();

  const [reply, setReply] = useState<EditState>({
    id: Number(id),
    status: false,
  });

  return (
    <CommentContext.Provider value={{ reply, setReply }}>
      {children}
    </CommentContext.Provider>
  );
};

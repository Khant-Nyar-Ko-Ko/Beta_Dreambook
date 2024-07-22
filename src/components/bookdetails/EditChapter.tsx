import { useChapterContext } from "@/contexts/ChapterContext";
import Toolbar from "../tools/Toolbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUpdateChapter } from "@/hooks/useChapterApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const EditChapter = ({
  id,
  title,
  content,
  chapterNum,
}: {
  id: number;
  title: string;
  content: string;
  chapterNum: number;
}) => {
  const { slug } = useParams<{ slug: string }>();
  console.log(slug);

  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editChapterNum, setEditChapterNum] = useState(chapterNum);

  const { setEdit } = useChapterContext();
  const editChapterMutation = useUpdateChapter();
  const queryClient = useQueryClient();

  const toggleEdit = (id: number) => {
    setEdit((prev: { id: number | null; status: boolean }) => ({
      id: prev.id === id ? null : id,
      status: !prev.status,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setEditContent(value);
  };

  const handleChapterNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setEditChapterNum(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editData = {
        id,
      title: editTitle,
      content: editContent,
      chapterNum: editChapterNum,
      priority: 1,
      status: false,
    };
    editChapterMutation.mutate(editData);
  };

  useEffect(() => {
    if (editChapterMutation.isSuccess) {
      toggleEdit(id);
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editChapterMutation.isSuccess, id]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[1000px] flex flex-col items-start md:items-center gap-3 p-3 h-auto"
    >
      <div className="flex w-[300px] md:w-[950px] gap-1 justify-between">
        <Input
          variant="chapterNum"
          type="number"
          onChange={handleChapterNumChange}
          value={editChapterNum}
        />
        <Input variant="edit" onChange={handleTitleChange} value={editTitle} />
      </div>
      <Toolbar
        variant="edit"
        value={editContent}
        onChange={handleContentChange}
        isDisabled={false}
      />
      <div className="flex mt-[200px] md:mt-[180px]">
        <Button
          variant="white"
          className="text-gray-600 dark:text-white"
          onClick={() => toggleEdit(id)}
        >
          Cancel
        </Button>
        <Button variant="default" type="submit">
          {editChapterMutation.isPending && <Loader2 className="animate-spin"/>}
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditChapter;

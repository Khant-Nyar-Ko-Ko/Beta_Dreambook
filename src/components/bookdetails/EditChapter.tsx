import { useChapterContext } from "@/contexts/ChapterContext"
import Loading from "../Loading"
import Toolbar from "../Toolbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useUpdateChapter } from "@/hooks/useChapterApi"
import { useState } from "react"
import { useParams } from "react-router-dom"

const EditChapter = ({id ,title, content} : {id : number ,title : string, content : string}) => {
    const { slug } = useParams<{ slug: string }>();
    console.log(slug);
    
    const [editTitle, setEditTitle] = useState(title);
    const [editContent, setEditContent] = useState(content);
    const {setEdit} = useChapterContext();
    const editChapterMutation = useUpdateChapter();

    const toggleEdit = (id: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEdit((prev: { id: number; status: any; }) => ({
          id: prev.id === id ? null : id, 
          status: !prev.status,
        }));
      };

      const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value)
      }

      const handleContentChange = (value : string) => {
        setEditContent(value)
      }

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const editData = {
            title : editTitle,
            content : editContent,
            chapterNum : id,
            priority: 1,
            status: false,
        }
        editChapterMutation.mutate(editData)
        if(editChapterMutation.isSuccess){
            toggleEdit(id)
        }
      }
      
  return (
    <form onSubmit={handleSubmit} className="w-full md:w-[1000px] border border-black flex flex-col items-center gap-3 p-3 h-auto">
                    <Input variant="edit" onChange={handleTitleChange} value={editTitle}/>
                    <Toolbar
                      variant="edit"
                      value={editContent}
                      onChange={handleContentChange}
                      isDisabled={false}
                    />
                    <div className="flex mt-[160px]">
                      <Button
                        variant="white"
                        className="text-gray-600 dark:text-white"
                        onClick={() => toggleEdit(id)}
                      >
                        Cancel
                      </Button>
                      <Button variant="default" type="submit">
                        <Loading />
                        <span
                        // className={bookUpdateMutation.isPending ? "hidden" : "block"}
                        >
                          Save
                        </span>
                      </Button>
                    </div>
                  </form>
  )
}

export default EditChapter
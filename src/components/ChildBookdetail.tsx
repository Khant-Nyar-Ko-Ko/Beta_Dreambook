import { Outlet, useNavigate, useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import TagInput from "./TagForm";
import { Button } from "./ui/button";
import BookImagePreview from "./BookImagePreview";
import { useFetchSingleBook, useUpdateBook } from "@/hooks/useBookApi";
import Toolbar from "./Toolbar";
import Loading from "./Loading";
import CustomDropdown from "./customDropDown";

const ChildBookdetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: createdBook, isPending, error , refetch} = useFetchSingleBook(slug?? "");
  const bookUpdateMutation = useUpdateBook();
  const [isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [bookDescription, setBookDescription] = useState('');
  const [coverImg, setCoverImg] = useState<string | File>('');

  useEffect(() => {
    if (createdBook) {
      console.log("Fetched Book Data:", createdBook);
      setTitle(createdBook.title);
      setCategoryId(createdBook.categoryId);
      setTags([...createdBook.keywords]);
      setBookDescription(createdBook.description || '');
      setCoverImg(createdBook.coverImg || '');
    }
  }, [createdBook]);

  useEffect(() => {
    refetch(); 
  }, [slug, refetch]);

  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className=" flex justify-center items-center w-full h-[700]">
        <Loading variant="blue" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading book details: {error.message}</div>;
  }

  if (!createdBook) {
    return <div>Loading...</div>;
  }



  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('Tags before submitting:', tags);
    const bookData = {
      title,
      description: bookDescription,
      categoryId,
      status: "true",
      keywords: [...tags],
      coverImg,
      slug
    };
    console.log('Book data:', bookData); 
    bookUpdateMutation.mutate(bookData, {
      onSuccess: (updatedBook) => {
        refetch();
        if (updatedBook.slug !== slug) {
          navigate(`/bookdetail/${updatedBook.slug}/chapters`);
        }else{
          navigate(`/bookdetail/${slug}/chapters`);
        }
      },
    });
  };


  return (
    <div className="flex flex-col w-4/5 h-screen px-3 py-4">
      <div className="flex items-center justify-between w-full pb-2 text-center border-b border-indigo-300/50">
        <h1 className="mx-5 text-3xl font-bold font-primary">Book Detail</h1>
        <SwitchButton />
      </div>
      {createdBook && <div className="flex">
        <div className="w-3/4 px-5">
          <div className="mt-2">
            <label htmlFor="default" className="block mb-2 text-lg font-medium text-gray-900">Title</label>
            <Input
              inputSize="lg"
              className="w-full font-bold border select-none"
              type="text"
              id="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              {...(!isEdit? {} : { disabled: true })}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="default" className="block mb-2 text-lg font-medium text-gray-900">Category</label>
            <CustomDropdown categoryId={categoryId} onChange={(value) => setCategoryId(value)} isDisabled={isEdit} />
          </div>
          <div className="mt-2">
            <div className="flex items-center bg-gray-100">
              <div className="w-full bg-white rounded">
                <TagInput
                  placeholder="Enter a tag"
                  initialTags={tags}
                  tags={tags}
                  setTags={setTags}
                  className="border-gray-300"
                  isDisabled={isEdit}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="default" className="block mb-2 text-lg font-medium text-gray-900 rounded-md">Description</label>
            <div className="w-full mb-5 border">
              <Toolbar value={bookDescription} onChange={setBookDescription} isDisabled={isEdit} />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            {isEdit? (
              <>
                <Button variant="white" className="text-red-600">Delete</Button>
                <Button variant="default" onClick={() => setIsEdit(!isEdit)}>Edit</Button>
              </>
            ) : (
              <>
                <Button variant="white" className="text-gray-600" onClick={() => setIsEdit(!isEdit)}>Cancel</Button>
                <Button variant="default" onClick={onSubmit}>Save</Button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col border-l">
          <div className="text-xs font-medium text-center">
            <BookImagePreview title={title} coverImg={coverImg} categoryId={categoryId} />
          </div>
        </div>
        <Outlet />
      </div>}
      
    </div>
  );
};

export default ChildBookdetail;
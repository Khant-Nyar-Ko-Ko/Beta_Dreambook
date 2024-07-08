import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { Input } from "./ui/input";
import TagInput from "./TagForm";
import { Button } from "./ui/button";
import { useFetchSingleBook, useUpdateBook } from "@/hooks/useBookApi";
import Toolbar from "./Toolbar";
import Loading from "./Loading";
import CustomDropdown from "./customDropDown";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import bookImg from "../assets/images/bookCrafting/bookImg.png";
import authorprofile from "../assets/images/Author.png";
import { Loader2 } from "lucide-react";
import BookStatusButton from "./BookStatusButton";


const ChildBookdetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: createdBook, isPending, error, refetch } = useFetchSingleBook(slug ?? "");
  console.log(createdBook);
  
  const { data: categories } = useFetchCategories();
  const bookUpdateMutation = useUpdateBook();
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [bookDescription, setBookDescription] = useState("");
  const [coverImg, setCoverImg] = useState<string | File>("");
  console.log(coverImg);
  

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

    useEffect(() => {
    if (createdBook) {
      setTitle(createdBook.title);
      setCategoryId(createdBook.categoryId);
      setTags(createdBook.keywords ? [...createdBook.keywords] : []);
      setBookDescription(createdBook.description || "");
      setCoverImg(createdBook.coverImg || "");
      setPreview(createdBook.coverImg || "");
    }
  }, [createdBook]);

  useEffect(() => {
        refetch();
      }, [slug, refetch]);

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  const selectedCategory = categories?.find(category => category.id === Number(categoryId))

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setCoverImg(file);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

    const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const bookData = {
      ...createdBook,
      title,
      description: bookDescription,
      categoryId,
      keywords: [...tags],
      coverImg: selectedFile,
      slug,
    };
    bookUpdateMutation.mutate(bookData, {
      onSuccess: (updatedBook) => {
        refetch();
        navigate(`/bookdetail/${updatedBook.slug !== slug ? updatedBook.slug : slug}/chapters`);
      },
    });
  };

    if (isPending) {
    return (
      <div className="flex justify-center items-center w-full h-[700]">
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

  return (
    <div className="flex flex-col w-4/5 h-screen bg-white dark:bg-darkMode1">
      <BookStatusButton text="Book Details"/>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w-3/4 px-5 pt-5">
            <div className="mt-2">
              <label
                htmlFor="default"
                className="block mb-2 text-lg font-medium text-gray-900 font-primary dark:text-white"
              >
                Title
              </label>
              <Input
                inputSize="lg"
                className="w-full font-bold border select-none"
                type="text"
                id="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book Title"
                disabled={isEdit}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="default"
                className="block mb-2 text-lg font-medium text-gray-900 font-primary dark:text-white"
              >
                Category
              </label>
              <CustomDropdown
                categoryId={categoryId}
                onChange={(value) => setCategoryId(value)}
                isDisabled={isEdit}
              />
            </div>         
             <div className="mt-2 bg-white dark:bg-darkMode1">
                <TagInput
                  placeholder="Enter a tag"
                  initialTags={tags}
                  tags={tags}
                  setTags={setTags}
                  className="border-gray-300"
                  isDisabled={isEdit}
                />
            </div>
            <div className="mt-5">
               <label htmlFor="default" className="block mb-2 text-lg font-medium text-gray-900 rounded-md dark:text-white">
                 Description
               </label>
               <div className="w-full mb-5 border">
                 <Toolbar
                   value={bookDescription}
                   onChange={setBookDescription}
                   isDisabled={isEdit}
                 />
               </div>
             </div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/4 p-5">
            <h1 className="text-center text-black font-primary dark:text-white">
              Cover Image
            </h1>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Book Cover Preview"
                    className="w-40 h-auto mx-auto my-5 rounded-md "
                  />
                ) : (
                  <div className="flex items-center justify-center w-48 h-64 mx-auto border-2 border-gray-300 border-dashed rounded-md">
                    <div className="text-center">
                      <img
                        className="w-10 h-10 mx-auto text-gray-400"
                        src={bookImg}
                        alt="Icon"
                      />
                      <p className="mt-2 text-sm text-gray-600">Click to upload</p>
                      <p className="text-xs text-gray-500">JPG, JPEG, or PNG</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-[200px] gap-5 h-[260px] pb-3 bg-white dark:bg-darkMode2 border border-slate-100 dark:border-darkMode1 rounded">
              <div className="relative flex shadow-sm justify-center h-[200px] py-3 mx-3 mt-3 overflow-hidden bg-slate-200 dark:bg-darkMode3 group">
                <div className="absolute flex flex-col gap-3 duration-200 transform translate-x-10 group-hover:translate-x-0 right-3 top-5">
                  <button className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white">
                    <IoMdHeartEmpty />
                  </button>
                  <button className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white">
                    <IoEyeOutline />
                  </button>
                  <button className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white">
                    <TiEdit />
                  </button>
                </div>
                <img
                  src={preview}
                  alt={title}
                  className="duration-200 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-2 mx-3">
                <p className="font-semibold text-black font-primary text-start dark:text-white">
                  {title.substring(0,15)}...
                </p>
                {selectedCategory && (
                  <div className="flex gap-1">
                    <img
                      src={selectedCategory.icon}
                      className="w-4 h-4"
                      alt="category logo"
                    />
                    <p className="text-sm font-primary text-slate-500 dark:text-white">
                      {selectedCategory.title}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <img
                    src={authorprofile}
                    className="w-6 h-6 rounded-full"
                    alt="author"
                  />
                  <p className="text-sm text-gray-600 font-primary dark:text-white">
                    By Unknown User
                  </p>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        <div className="flex justify-end gap-3 mr-[300px]">
           {isEdit ? (
             <>
               <Button variant="white" className="text-red-600">
                 Delete
               </Button>
               <Button variant="default" onClick={handleEdit}>
                 Edit
               </Button>
             </>
           ) : (
             <>
               <Button
                 variant="white"
                 className="text-gray-600 dark:text-white"
                 onClick={handleEdit}
               >
                 Cancel
               </Button>
               <Button variant="default" type="submit"> 
               <Loader2
                className={
                  bookUpdateMutation.isPending ? "block animate-spin" : "hidden"
                }
              />
                 <span className={
                  bookUpdateMutation.isPending ? "hidden" : "block"
                }>Save</span>
               </Button>
             </>
           )}
         </div>
      </form>
    </div>
  );
};


export default ChildBookdetail;

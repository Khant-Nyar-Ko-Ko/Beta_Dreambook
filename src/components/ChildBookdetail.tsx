import { Outlet, useNavigate, useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import TagInput from "./TagForm";
import { Button } from "./ui/button";
import { useFetchSingleBook, useUpdateBook } from "@/hooks/useBookApi";
import Toolbar from "./Toolbar";
import Loading from "./Loading";
import CustomDropdown from "./customDropDown";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import bookImg from "../assets/images/bookCrafting/bookImg.png";
import authorprofile from "../assets/images/Author.png";

const ChildBookdetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: createdBook,
    isPending,
    error,
    refetch,
  } = useFetchSingleBook(slug ?? "");
  const bookUpdateMutation = useUpdateBook();
  const [isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [bookDescription, setBookDescription] = useState("");
  const [coverImg, setCoverImg] = useState<string | File>("");

  useEffect(() => {
    if (createdBook) {
      console.log("Fetched Book Data:", createdBook);
      setTitle(createdBook.title);
      setCategoryId(createdBook.categoryId);
      setTags([...createdBook.keywords]);
      setBookDescription(createdBook.description || "");
      setCoverImg(createdBook.coverImg || "");
    }
  }, [createdBook]);

  useEffect(() => {
    refetch();
  }, [slug, refetch]);

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const { data: categories } = useFetchCategories();

  const selectedCategory = categories?.filter(
    (category) => category.id === Number(categoryId)
  );

  // useEffect(() => setPreview(coverImg), [coverImg]);

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
    console.log("Tags before submitting:", tags);
    const bookData = {
      title,
      description: bookDescription,
      categoryId,
      status: "true",
      keywords: [...tags],
      coverImg,
      slug,
    };
    console.log("Book data:", bookData);
    bookUpdateMutation.mutate(bookData, {
      onSuccess: (updatedBook) => {
        refetch();
        if (updatedBook.slug !== slug) {
          navigate(`/bookdetail/${updatedBook.slug}/chapters`);
        } else {
          navigate(`/bookdetail/${slug}/chapters`);
        }
      },
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    console.log("File to upload:", selectedFile);
  };

  return (
    <div className="flex flex-col w-4/5 h-screen px-3 py-4 bg-white dark:bg-darkMode1">
      <div className="flex items-center justify-between w-full pb-2 text-center border-b border-indigo-300/50">
        <h1 className="mx-5 text-3xl font-bold text-black font-primary dark:text-white">
          Book Detail
        </h1>
        <SwitchButton />
      </div>
      {createdBook && (
        <div className="flex">
          <div className="w-3/4 px-5">
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
                {...(!isEdit ? {} : { disabled: true })}
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
            <div className="mt-2">
              <div className="flex items-center bg-gray-100">
                <div className="w-full bg-white rounded dark:bg-darkMode1">
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
              <label
                htmlFor="default"
                className="block mb-2 text-lg font-medium text-gray-900 rounded-md dark:text-white"
              >
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
            <div className="flex justify-end gap-3">
              {isEdit ? (
                <>
                  <Button variant="white" className="text-red-600">
                    Delete
                  </Button>
                  <Button variant="default" onClick={() => setIsEdit(!isEdit)}>
                    Edit
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="white"
                    className="text-gray-600 dark:text-white"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    Cancel
                  </Button>
                  <Button variant="default" onClick={onSubmit}>
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col border-l">
            <div className="text-xs font-medium text-center">
              <div className="max-w-md p-4 mx-auto bg-white dark:bg-darkMode1">
                <h1 className="text-sm text-center text-black dark:text-white">
                  Cover Image
                </h1>
                <div className="p-4 my-5 border border-gray-400 border-dashed rounded-md">
                  <form onSubmit={handleSubmit}>
                    <div className="relative ">
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
                          className="w-48 h-64 mx-auto rounded-md"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-48 h-64 mx-auto border-2 border-gray-300 border-dashed rounded-md ">
                          <div className="text-center">
                            <img
                              className="w-10 h-10 mx-auto text-gray-400"
                              src={bookImg}
                              alt="Icon"
                            />
                            <p className="mt-2 text-sm text-gray-600">
                              Click to upload
                            </p>
                            <p className="text-xs text-gray-500">
                              JPG, JPEG, or PNG
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
                <div className=" flex flex-col w-[230px] gap-5 h-[260px] pb-3 bg-white dark:bg-darkMode2 border border-slate-100 dark:border-darkMode1 rounded">
                  <div className="relative flex justify-center px-10 py-3 mx-3 mt-3 overflow-hidden bg-slate-200 dark:bg-darkMode3 group">
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
                      className="my-2 duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-1 mx-3">
                    <p className="text-lg font-semibold text-black font-primary text-start dark:text-white">
                      {title}
                    </p>

                    {selectedCategory && (
                      <div className="flex gap-1 ">
                        <img
                          src={selectedCategory[0]?.icon}
                          className="w-4 h-4"
                          alt="categorylogo"
                        />
                        <p className="text-sm font-primary text-slate-500 dark:text-white">
                          {selectedCategory[0]?.title}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 ">
                      <img
                        src={authorprofile}
                        className="w-6 h-6 rounded-full "
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
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default ChildBookdetail;

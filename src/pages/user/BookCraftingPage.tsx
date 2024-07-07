import React, { useEffect, useState } from "react";
import { useCreateBook } from "@/hooks/useBookApi";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { getToken } from "@/service/authService";
import Toolbar from "@/components/Toolbar";
import defaultImage from "../../assets/images/bookCrafting/bookImg.png";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCloseCircleSharp } from "react-icons/io5";

const BookCraftingPage = () => {
  const bookCreateMutation = useCreateBook();
  const navigate = useNavigate();

  const { data: categories } = useFetchCategories();

  const [inputValue, setInputValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    defaultImage
  );
  const [keywords, setKeywords] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [coverImg, setCoverImg] = useState<string | File>("");

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
        setKeywords([...keywords, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleDelete = (K: string) => {
    const newKeywords = keywords?.filter((k) => k !== K);
    setKeywords([...newKeywords]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCoverImg(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(defaultImage);
      setCoverImg("");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bookData = {
      title,
      description,
      categoryId,
      keywords,
      coverImg,
      status : false
    };
    console.log(bookData);

    bookCreateMutation.mutate(bookData, {
      onSuccess: (createdBook) => {
        // Assuming the createdBook contains the book ID
        navigate(`/bookdetail/${createdBook.slug}`);
        console.log(createdBook);
      },
    });
  };

  useEffect(() => {
    if (bookCreateMutation.isSuccess) {
      getToken();
    }
  }, [bookCreateMutation.isSuccess]);

  useEffect(() => {
    if (bookCreateMutation.isError) {
      alert("Error");
    }
  }, [bookCreateMutation.isError]);

  return (
    <div className="md:p-[30px] select-none py-5 bg-white dark:bg-darkMode1">
      <div className="flex items-center mb-10 gap-x-5 font-primary">
        <BackButton backPath="/" />
        <h1 className="text-2xl font-bold text-black dark:text-white">Creating A New Book</h1>
      </div>

      <form
        className="flex flex-col md:flex-row items-start px-10 pb-10 gap-x-16 w-screen md:w-[4/5]"
        action=""
        onSubmit={onSubmit}
      >
        <div>
          <Input className="hidden" type="text" value={status} readOnly />

          <div>
            <div
              className="flex flex-col justify-center items-center w-[200px] h-[300px] border-2 border-gray-200 border-dotted rounded-lg py-5 px-10"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <img src={imagePreview as string} className="object-cover" />
              {imagePreview === defaultImage ? (
                <div className="text-[10px] text-gray-300 text-center">
                  <p>Drop your images here or browse JPG, JPEG or PNG</p>
                  <p>The size must be 123x123 px</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <input
            id="fileInput"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImageChange(e);
            }}
          />

          <p className="my-2 font-semibold text-center text-default">
            Select Book Cover
          </p>
        </div>

        <div className="flex flex-col gap-y-5">
          <div>
            <label htmlFor="title" className="mb-2 font-semibold text-black dark:text-white">
              Title
            </label>
            <Input
              id="title"
              className=" w-[300px] md:w-full p-1 border border-gray-200 rounded-lg outline-none w"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-2 font-semibold text-black dark:text-white">
              Category
            </label>
            <select
              id="category"
              className="w-[300px] md:w-full p-1 py-2 text-black dark:text-gray-500 border bg-white dark:bg-darkMode1 border-gray-200 rounded-lg outline-none"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="" className="text-sm w-[300px] md:w-full text-black dark:text-white">
                Select Category
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="keywords" className="mb-1 font-semibold text-black dark:text-white">
              Keywords
            </label>
            <Input
              id="keywords"
              className="w-[300px] md:w-full p-1 border border-gray-200 rounded-lg outline-none"
              value={inputValue}
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="keywords"
              onKeyDown={handleAddKeyword}
            />
            <div className="flex items-center my-2 gap-x-3">
              {keywords?.map((k, i) => (
                <div
                  key={i}
                  className="flex items-center p-1 bg-gray-200 rounded dark:bg-darkMode2 gap-x-1"
                >
                  <p className="text-black dark:text-white">{k}</p>
                  <p
                    className="hover:cursor-pointer"
                    onClick={() => handleDelete(k)}
                  >
                    <IoCloseCircleSharp className="text-black dark:text-white" />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className=" w-[300px] md:w-[350px]">
            <p className="mb-1 font-semibold text-black dark:text-white">Description</p>
            <Toolbar
              value={description}
              onChange={(value) => setDescription(value)}
              isDisabled={false}
            />
          </div>

          <Button
            type="submit"
            className={`py-2 w-[300px] md:w-[350px] rounded text-white ${
              bookCreateMutation.isPending ? "bg-default" : "bg-gray-400 "
            }`}
          >
            <div className="flex items-center justify-center gap-x-3 font-primary">
              <Loader2
                className={
                  bookCreateMutation.isPending ? "block animate-spin" : "hidden"
                }
              />
              Create Now
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookCraftingPage;

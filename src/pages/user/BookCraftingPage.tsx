import React, { useEffect, useState, useRef } from "react";
import { useCreateBook } from "@/hooks/useBookApi";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { getToken } from "@/service/authService";
import Toolbar from "@/components/tools/Toolbar";
import defaultImage from "../../assets/images/bookCrafting/bookImg.png";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCloseCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import BackButton from "@/components/tools/BackButton";
import { FaPlus } from "react-icons/fa";

const BookCraftingPage = () => {
  const bookCreateMutation = useCreateBook();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [errors, setErrors] = useState({
    title: "",
    categoryId: "",
    description: "",
    coverImg: "",
  });

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
        setKeywords([...keywords, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleAddKeywordButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue("");
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

  const validate = () => {
    const newErrors = {
      title: "",
      categoryId: "",
      description: "",
      coverImg: "",
    };

    if (!title.trim()) newErrors.title = "Title is required";
    if (!categoryId) newErrors.categoryId = "Category is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!coverImg) newErrors.coverImg = "Book cover is required";

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const bookData = {
      title,
      description,
      categoryId,
      keywords,
      coverImg,
      status: false,
    };

    bookCreateMutation.mutate(bookData, {
      onSuccess: (createdBook) => {
        navigate(`/bookdetail/${createdBook.slug}`);
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
    <motion.div
      className="md:p-[50px] select-none py-5 bg-white dark:bg-darkMode1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-10 gap-x-5 md:gap-x-10 font-primary">
        <BackButton backPath="/" />
        <motion.h1
          className="font-bold text-center text-black md:text-2xl dark:text-white"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Creating A New Book
        </motion.h1>
      </div>

      <form
        className="flex flex-col md:flex-row justify-center md:justify-start ml-0 md:ml-36 items-start px-10 pb-10 gap-x-16 md:gap-x-40 w-screen md:w-[4/5]"
        onSubmit={onSubmit}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="flex flex-col justify-center items-center w-[200px] h-[300px] ml-12 md:ml-0 border-2 border-gray-200 border-dotted rounded-lg py-5 px-10"
            onClick={() => fileInputRef.current?.click()}
          >
            <motion.img
              src={imagePreview as string}
              className="object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {imagePreview === defaultImage && (
              <div className="text-[10px] text-gray-300 text-center">
                <p>Drop your images here or browse JPG, JPEG or PNG</p>
                <p>The size must be 123x123 px</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.coverImg && (
            <p className="text-sm text-red-500">{errors.coverImg}</p>
          )}
          <p className="my-2 font-semibold text-center text-default">
            Select Book Cover
          </p>
        </motion.div>

        <div className="flex flex-col gap-y-5">
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="title"
              className="mb-2 font-semibold text-black dark:text-white"
            >
              Title
            </label>
            <Input
              variant="craft"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="category"
              className="mb-2 font-semibold text-black dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              className="w-[300px] md:w-full px-1 py-2 text-black dark:text-gray-500 border bg-white dark:bg-darkMode1 border-gray-200 rounded-lg outline-none"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option
                value=""
                className="text-sm w-[300px] md:w-full text-black dark:text-white"
              >
                Select Category
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">{errors.categoryId}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="keywords"
              className="mb-1 font-semibold text-black dark:text-white"
            >
              Keywords
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="keywords"
                className="w-[300px] md:w-full p-1 border border-gray-200 rounded-lg outline-none"
                value={inputValue}
                variant="keyword"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="keywords"
                onKeyDown={handleAddKeyword}
              />
              <button
                className="block p-1 text-white rounded-full cursor-pointer bg-default md:hidden"
                onClick={handleAddKeywordButton}
              >
                <FaPlus />
              </button>
            </div>

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
          </motion.div>

          <motion.div
            className="w-[300px] md:w-[350px] h-[250px]"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-1 font-semibold text-black dark:text-white">
              Description
            </p>
            <Toolbar
              variant="craft"
              value={description}
              onChange={(value) => setDescription(value)}
              isDisabled={false}
              size="lg"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              type="submit"
              className="py-2 mt-4 w-[300px] md:w-[600px] rounded text-white bg-default"
            >
              <div className="flex items-center justify-center gap-x-3 font-primary">
                <Loader2
                  className={
                    bookCreateMutation.isPending
                      ? "block animate-spin"
                      : "hidden"
                  }
                />
                Create Now
              </div>
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};

export default BookCraftingPage;

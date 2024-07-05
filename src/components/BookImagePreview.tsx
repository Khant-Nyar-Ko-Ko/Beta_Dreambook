/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, useEffect } from "react";
import bookImg from "../assets/images/bookCrafting/bookImg.png";
import authorprofile from "../assets/images/Author.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { useFetchCategories } from "@/hooks/useCategoryApi";

interface BookImagePreviewProps {
  title: string;
  coverImg: any;
  categoryId: string;
}

const BookImagePreview: React.FC<BookImagePreviewProps> = ({
  title,
  coverImg,
  categoryId,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const { data: categories } = useFetchCategories();

  const selectedCategory = categories?.filter(
    (category) => category.id === Number(categoryId)
  );

  useEffect(() => {
    setPreview(coverImg);
  }, [coverImg]);

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
    <div className="max-w-md p-4 mx-auto bg-white dark:bg-darkMode1">
      <h1 className="text-sm text-center text-black dark:text-white">Cover Image</h1>
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
                  <p className="mt-2 text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-500">JPG, JPEG, or PNG</p>
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
  );
};

export default BookImagePreview;

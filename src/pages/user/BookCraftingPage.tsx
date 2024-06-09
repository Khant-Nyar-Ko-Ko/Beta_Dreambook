/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Toolbar from "@/components/Toolbar";
import CustomDropdown from "@/components/customDropDown";
import { NavLink } from "react-router-dom";
import BookImagePreviewSec from "@/components/BookImagePreviewSec";
import TagInput from "@/components/TagForm";
import React, { useEffect, useState } from "react";
import { useCreateBook } from "@/hooks/useBookApi";
// import { BookDataType } from "@/utils/type";
import { getToken } from "@/service/authService";

const BookCraftingPage = () => {
  const createBookMutation = useCreateBook();
  const [bookData, setBookData] = useState<any>({
    title : "",
    coverImg :"",
    description : "",
    categoryId : "",
    status : "",
    keywords : [""],
  });

  useEffect(() => {
    if (createBookMutation.isSuccess) {
      getToken();
    }
  }, [createBookMutation.isSuccess]);

  useEffect(() => {
    if (createBookMutation.isError) {
      alert("Error");
    }
  }, [createBookMutation.isError]);

  const handleTitleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setBookData((prev : any) => ({
      ...prev,
      title : e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBookMutation.mutate(bookData!);
  };

  const [tags, setTags] = useState<string[]>([]);
  return (
    <div>
      <div className="mb-10 ml-28">
        <div className="flex items-center gap-20 m-5 col">
          <NavLink to={"/home"}>
            <button className="text-default">Back</button>
          </NavLink>
          <h1 className="text-3xl font-bold font-primary">Creating New Book</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex mx-auto flex-row-3 gap-28 font-primary"
        >
          <div className="mx-28">
            <BookImagePreviewSec title={""} />
          </div>
          <div className="w-1/2 gap-5 px-5">
            <div className="mt-10">
              <label
                htmlFor="default"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Title
              </label>
              <Input
                inputSize="lg"
                className="w-full font-bold border rounded"
                type="text"
                id="text"
                placeholder="Book Title"
                value={bookData.title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="default"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Category
              </label>
              <CustomDropdown />
            </div>
            <div className="mt-5">
              <div className="flex items-center bg-gray-100">
                <div className="w-full bg-white rounded">
                  <label
                    htmlFor="default"
                    className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
                  >
                    Keywords
                  </label>
                  <TagInput
                    placeholder="Enter a tag"
                    tags={tags}
                    setTags={setTags}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="my-5 border rounded">
              <Toolbar />
            </div>

            <NavLink to={"/bookdetail"}>
              <Button type="submit" className="w-full mt-5 default:">
                Create Now
              </Button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookCraftingPage;

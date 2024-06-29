import { Outlet, useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";

import { Input } from "./ui/input";
import CustomDropdown from "./customDropDown";
import { useState } from "react";
import TagInput from "./TagForm"; 
import { Button } from "./ui/button";
import BookImagePreview from "./BookImagePreview";
import { useFetchSingleBook, useUpdateBook } from "@/hooks/useBookApi";
import Toolbar from "./Toolbar";

const ChildBookdetail: React.FC = () => {
  const {id} = useParams<{id : string}>();
  console.log(id);
 const {data : createdBook} = useFetchSingleBook(id);
 console.log(createdBook);
 const bookUpdateMutation = useUpdateBook();
 console.log(bookUpdateMutation);
 
 
  const [tags, setTags] = useState<string[]>([]);
  // const [title, setTitle] = useState<string>("FINANCIAL FREEDOM");
  if (!createdBook) {
    // Handle loading state or error state when book data is not available yet
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-4/5 h-auto px-3 my-5">
      <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50">
        <h1 className="mx-5 text-3xl font-bold font-primary">Book Detail</h1>
        <SwitchButton />
      </div>
      <div className="flex">
        <div className="w-9/12 gap-5 px-5">
          <div className="mt-10">
            <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Title
            </label>
            <Input
              inputSize="lg"
              className="w-full font-bold border"
              type="text"
              id="text"
              value={createdBook.title}
              // onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Category
            </label>
            <CustomDropdown categoryId={createdBook.categoryId} />
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
          <div className="my-5 ">
          <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
            >
              Descirption
            </label>
          <div className="w-full mt-5 mb-5 border">
          
            <Toolbar value={""} onChange={function (): void {
              throw new Error("Function not implemented.");
            } } />
          </div>
          </div>
          <Button variant="default" className="ml-auto">
            Save
          </Button>
        </div>
        <div className="flex flex-col w-3/12 pl-5 border-l border-indigo-300/50 ">
          <div className="flex mx-auto flex-row-3 gap-28 font-primary">
            <div className="text-xs font-medium text-center">
              <BookImagePreview title={createdBook.title}  coverImg={createdBook.coverImg}/>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ChildBookdetail;

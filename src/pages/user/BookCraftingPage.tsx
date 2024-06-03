import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Toolbar from "@/components/Toolbar";
import CustomDropdown from "@/components/customDropDown";
import { NavLink } from "react-router-dom";
import BookImagePreviewSec from "@/components/BookImagePreviewSec";
import TagInput from "@/components/TagForm";
import { useState } from "react";

const BookCraftingPage = () => {
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

        <div className="flex mx-auto flex-row-3 gap-28 font-primary">
          <div className="mx-28">
            <BookImagePreviewSec title={""} />
          </div>
          <div className="w-6/12 gap-5 px-5">
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
              <CustomDropdown />
            </div>
            <div className="mt-5">
              <div className="flex items-center bg-gray-100">
                <div className="w-full bg-white rounded shadow-md">
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

            <div className="mt-5 mb-5 border-2 border-black">
              <Toolbar />
            </div>

            <NavLink to={"/bookdetail"}>
              <Button className="w-full mt-5 default:">Create Now</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCraftingPage;

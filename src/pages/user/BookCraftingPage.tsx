import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bookImg from "../../assets/images/bookCrafting/bookImg.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Toolbar from "@/components/Toolbar";
import CustomDropdown from "@/components/customDropDown";
import { NavLink } from "react-router-dom";
import { useCreateBook } from "@/hooks/useBookApi";
import { useState } from "react";

const BookCraftingPage = () => {
  const [bookData, setBookData] = useState({
    title : " ",
    description : " ",
    slug : " ",
    categoryId : " ",
    userId : " ",
    keywords : " ",
    coverImg : " ",
  });

  const createBook = useCreateBook();
  
  const handleAddBook = () => {
      createBook.mutate(bookData)
  }

  return (
    <div>
      <div className="mb-10 ml-28">
        <div className="flex gap-20 mt-12 ml-28 col">
          <NavLink to={"/home"}>
            {" "}
            <button className="text-default">Back</button>
          </NavLink>
          <h1 className="text-3xl font-bold font-primary">Creating New Book</h1>
        </div>

        <form className="flex mx-auto flex-row-3 gap-28 font-primary">
          <div>
            <div className="py-40 mt-20 border border-black border-dashed rounded-lg ml-28 w-72">
              <img className="w-10 mx-auto" src={bookImg} alt="" />

              <div className="text-xs font-bold text-center">
                <p>Drop your images here or browse</p>
                <h4>JPG,JPEG or PNG</h4>
                <p>The size must be (123 x 123) px</p>
                {/* <Input
                  className="p-8 text-xs text-gray-600 w-23 font-primary"
                  id="picture"
                  type="file"
                /> */}
              </div>
            </div>
          </div>

          <div className="w-full mx-auto basis-1/2">
            <div className="mt-20 ">
              <Label htmlFor="email">Title</Label>
              <Input
                className="w-full font-bold border-none"
                type="text"
                id="text"
                placeholder="Book Title"
                value={bookData.title}
                onChange={(e) => setBookData({...bookData, title: e.target.value})}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="default"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <CustomDropdown />
            </div>

            <div className="mt-5">
              <Label>Keywords</Label>
              <div className="flex flex-row">
                <Badge variant="default">
                  Secondary <button className="px-1">x</button>
                </Badge>
                <Badge variant="destructive">
                  Secondary <button className="px-1">x</button>
                </Badge>
                <Badge variant="destructive">
                  Secondary<button className="px-1">x</button>
                </Badge>
                <Badge variant="destructive">
                  Secondary<button className="px-1">x</button>
                </Badge>
                <Badge variant="destructive">
                  Secondary<button className="px-1">x</button>
                </Badge>
              </div>
            </div>

            {/* <div className="mt-5 ">
              <Label htmlFor="message">Description</Label>
              <Textarea
                className="mt-2"
                placeholder="Type your message here."
                id="message"
              />
            </div>
            <div className="flex gap-4 mx-auto">
              <ToggleGroup type="multiple">
                <ToggleGroupItem
                  className="p-4"
                  value="bold"
                  aria-label="Toggle bold"
                >
                  <Bold className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="p-4"
                  value="italic"
                  aria-label="Toggle italic"
                >
                  <Italic className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline"
                  className="p-4"
                  aria-label="Toggle underline"
                >
                  <Underline className="w-4 h-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div> */}

            <div className="mt-5 mb-5 border-2 border-black">
              <Toolbar />
            </div>

            <NavLink to={"/bookdetail"}>
              <Button onClick={handleAddBook} className="w-full mt-5 default:">Create Now</Button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookCraftingPage;

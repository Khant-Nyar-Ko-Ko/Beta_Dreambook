import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bookImg from "../assets/images/bookCrafting/bookImg.png";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge, Bold, Italic, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
const BookCraftingPage = () => {
  return (
    <div>
      <div className="mb-10  ml-28">
        <div className="flex gap-20 mt-12 ml-28 col">
          <button className="text-default">Back</button>
          <h1 className="text-3xl font-bold font-primary">Creating New Book</h1>
        </div>

        <div className="flex flex-row mt-20 gap-28 font-primary">
          <div>
            <div className="py-40 border border-black border-dashed rounded-lg ml-28 w-72 ">
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

          <div>
            <div className="mt-20 ">
              <Label htmlFor="email">Title</Label>
              <Input
                className="font-bold border-4"
                type="text"
                id="text"
                placeholder="Book Title"
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="default"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Default select
              </label>
              <select
                id="default"
                className="block w-full p-3 mb-6 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>

            <div>
              <Label>Keywords</Label>
              <Badge>Badge</Badge>
            </div>

            <div className="mt-5 ">
              <Label htmlFor="message">Description</Label>
              <Textarea
                className="mt-2"
                placeholder="Type your message here."
                id="message"
              />
            </div>
            <div className="flex gap-4 mx-5 mt-5">
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
            </div>
            <Button className="w-full default:">Create Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCraftingPage;

import { Outlet } from "react-router-dom";
import SwitchButton from "./SwitchButton";
// import { Button } from "./ui/button";
// import { FaPlus } from "react-icons/fa6";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import Toolbar from "./Toolbar";

const Chapters = () => {
  return (
    <div className="flex flex-col w-4/5 h-auto px-3 my-5 font-primary">
      <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50 ">
        <h1 className="mx-5 text-3xl font-bold ">Chapters</h1>

        <SwitchButton />
      </div>
      <div className="mx-auto mt-auto mb-auto text-center ">
        <h1 className="mt-3 text-2xl font-normal">Craft a Chapter</h1>
        <p className="mt-3 text-gray-400">
          Could you please draft a comprehensive chapter for the book?
        </p>
        {/* <Button className="flex gap-2 mx-auto mt-3">
          <FaPlus />
          Create New Chapter
        </Button> */}

        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Creating A Chapter</DrawerTitle>
              <DrawerDescription>
                <div className="mt-5">
                  <label
                    htmlFor="default"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <Input
                    inputSize="lg"
                    className="font-bold border "
                    type="text"
                    id="text"
                    placeholder="Book Title"
                  />
                </div>
                {/* <div className="mt-5 mb-5 border-2 border-gray">
                  <Label htmlFor="content mt-5">Content</Label>
                  <Toolbar />
                </div> */}
                <div className="mt-5 mb-5 border w-68">
                  <label
                    htmlFor="default"
                    className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
                  >
                    Content
                  </label>
                  {/* <Toolbar /> */}
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button variant="default" className="w-20 mx-auto">
                Submit
              </Button>
              {/* <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <Outlet />
    </div>
  );
};

export default Chapters;

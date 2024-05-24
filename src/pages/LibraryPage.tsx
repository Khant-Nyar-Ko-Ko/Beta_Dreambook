import LibCategory from "@/components/librarycomponents/LibCategory";
import libraryBg from "../assets/images/library/librarybg.png";
import { RiFilter3Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LibraryPage = () => {
  return (
    <div>
      {/* Headline */}
      <div className="relative w-screen h-[340px]">
        <img
          src={libraryBg}
          className="absolute top-0 left-0 w-full h-full object-fir"
          alt="Background"
        />
        <div className="absolute top-0 left-0 z-10 w-full h-full opacity-20 bg-default"></div>
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full ">
          <div className="flex flex-col items-center justify-center gap-5">
            <h3 className="text-3xl font-semibold text-white font-primary">
              Library
            </h3>
            <p className="text-white font-primary">
              Explore your favorite books
            </p>
            <p className="text-white font-primary">
              Reading is the best for get idea , Keep Reading
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-screen h-auto">
        <LibCategory />
        <div className="w-full ">
          <div className="flex items-center justify-around py-10">
            <div className="flex items-center gap-5 ">
              <div className="p-2 border rounded border-slate-400">
                <RiFilter3Line size="22px" />
              </div>
              <div className="p-2 border rounded border-slate-400">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-2 text-sm">
                    <p>Sort by default</p>
                    <IoIosArrowDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;

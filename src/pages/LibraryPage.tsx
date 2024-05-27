import LibCategory from "@/components/librarycomponents/LibCategory";
import libraryBg from "../assets/images/library/librarybg.png";
import { RiFilter3Line } from "react-icons/ri";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import LibraryBookCard from "@/components/librarycomponents/LibraryBookCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const LibraryPage = () => {
  const bookCards = Array.from({ length: 12 }, (_, i) => (
    <LibraryBookCard key={i} />
  ));
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
      <div className="flex w-screen ">
        <LibCategory />
        <div className="w-full ">
          <div className="flex justify-between gap-2 mx-10 my-5">
            <div className="flex items-center gap-5 ">
              <div className="p-[7px] border rounded">
                <RiFilter3Line size="22px" />
              </div>
              <div className="p-2 border rounded ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-between gap-5 px-2 text-sm">
                    <p>Sort by default</p>
                    <IoIosArrowDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Checkbox /> <p className="px-2">Sort by random</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox /> <p className="px-2">Sort by latest</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox /> <p className="px-2">Sort by A-Z</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="relative">
              <IoIosSearch
                className="absolute left-2 top-[10px]"
                color="gray"
                size="20"
              />
              <Input type="search" placeholder="      Search" />
            </div>
          </div>
          <div className="grid items-center grid-cols-4 my-10 ms-10 ">
            {bookCards}
          </div>
          <div className="flex items-center justify-center ">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;

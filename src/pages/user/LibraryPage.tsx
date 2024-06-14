/* eslint-disable @typescript-eslint/no-explicit-any */
import LibCategory from "@/components/librarycomponents/LibCategory";
import libraryBg from "../../assets/images/library/librarybg.png";
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
import { useSearchParams } from "react-router-dom";
import { useFetchBooks } from "@/hooks/useBookApi";
import Loading from "@/components/Loading";
import LibraryBookCard from "@/components/librarycomponents/LibraryBookCard";
import Paginate from "react-paginate";

const LibraryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const currentPage = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, error } = useFetchBooks(currentPage);
  const books = data?.items;
  console.log(data?.meta?.currentPage);
  const pageCount = data?.meta?.totalPages;

  const handlePageChange = (selectedItem: { selected: number }) => {
    setSearchParams({ page: (selectedItem.selected + 1).toString() });
  };

  if (isLoading) {
    return <Loading variant="blue" />;
  }

  if (error) {
    return (
      <div className="text-center">
        <p>Failed to load the books. Please try again later.</p>
        <button onClick={() => window.location.reload()} className="btn-retry">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-screen h-[340px]">
        <img
          src={libraryBg}
          className="absolute top-0 left-0 w-full h-full object-fit"
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
              Reading is the best for get idea, Keep Reading
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-screen">
        <LibCategory />
        <div className="w-full">
          <div className="flex justify-between items-center mx-3 md:mx-[100px] my-5">
            <div className="flex items-center gap-5">
              <div className="p-[7px] border rounded">
                <RiFilter3Line className="text-[16px] md:text-[24px]" />
              </div>
              <div className="px-1 py-2 border rounded md:px-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-between gap-1 text-xs md:px-2 md:gap-5 md:text-sm">
                    <p>Sort by default</p>
                    <IoIosArrowDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white ">
                    <DropdownMenuItem>
                      <Checkbox checked />{" "}
                      <p className="px-2">Sort by latest</p>
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
                className="absolute left-2 top-2 md:top-[10px] text-[16px] md:text-[24px]"
                color="gray"
              />
              <Input
                type="search"
                className="pl-7 md:pl-12"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 py-5 mx-10 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mx-4">
            <LibraryBookCard books={books} />
          </div>
          <Paginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< prev"
            renderOnZeroPageCount={null}
            containerClassName="flex list-none justify-center p-4"
            pageLinkClassName="px-3 py-1 border rounded hover:bg-default hover:text-white transition-colors duration-200"
            previousLinkClassName="px-3 py-1 border rounded hover:bg-default hover:text-white transition-colors duration-200"
            nextLinkClassName="px-3 py-1 border rounded hover:bg-default hover:text-white transition-colors duration-200"
            breakLinkClassName="px-3 py-1 border rounded hover:bg-default hover:text-white transition-colors duration-200"
            activeLinkClassName="bg-default text-white px-3 py-1 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;

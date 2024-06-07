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
import { useFetchPaginatedBooks } from "@/hooks/useBookApi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const LibraryPage = () => {
  const itemsPerPage = 12;
  
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageParam);

  const { data, error, isLoading } = useFetchPaginatedBooks(currentPage);
  const books = data?.items;
  const totalPages = data?.meta?.totalPages || 1;

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (page:any) => {
    setSearchParams({ page: page.toString() });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, books?.length || 0);
  const paginatedBooks = books ? books.slice(startIndex, endIndex) : [];

  if (currentPage === totalPages && endIndex < books?.length) {
    const remainingBooks = books.length - endIndex;
    const additionalBooks = books.slice(endIndex, endIndex + remainingBooks);
    paginatedBooks.push(...additionalBooks);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading books</div>;
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
            <LibraryBookCard books={paginatedBooks} />
          </div>
          <div>
            <Pagination>
              <PaginationContent className="flex items-center h-10 gap-3 w-[300px] my-5">
                <PaginationItem>
                  <PaginationPrevious
                    className="text-center text-white rounded-full bg-default"
                    href="#"
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={`text-black border ${currentPage === i + 1 ? "active:border-default" : ""}`}
                      href="#"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis className="text-black" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="text-center text-white rounded-full bg-default"
                    href="#"
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  />
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
import { RiFilter3Line } from "react-icons/ri"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { IoIosArrowDown, IoIosSearch } from "react-icons/io"
import { Input } from "../ui/input"
import LibraryBookCard from "./LibraryBookCard"
import Paginate from "react-paginate";
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCategory } from "@/contexts/CategoryContext"
import { useFetchBooks } from "@/hooks/useBookApi"
import Loading from "../Loading"
import { useDebounce } from 'react-use';

const LibBookSection = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1");
    const [searchInput, setSearchInput] = useState(
      searchParams.get("title") || ""
    );
    const [searchTitle, setSearchTitle] = useState(
      searchParams.get("title") || ""
    );
    const [sort, setSort] = useState<string | undefined>(undefined);
    const [debouncedSearchInput, setDebouncedSearchInput] = useState('');

     useDebounce(
      () => setSearchTitle(debouncedSearchInput),
      1000,
      [debouncedSearchInput]
    );
    
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      setDebouncedSearchInput(e.target.value);
    };

  
    useEffect(() => {
      const params = new URLSearchParams({ page: currentPage.toString() });
      if (searchTitle) params.set("title", searchTitle);
      if (sort) params.set("sort", sort);
      setSearchParams(params);
    }, [searchTitle, currentPage, sort, setSearchParams]);
  
    const { selectedCategories } = useCategory();
    const { data, isLoading, error } = useFetchBooks(
      currentPage,
      searchTitle,
      selectedCategories,
      sort
    );
    const books = data?.items;
    const pageCount = data?.meta?.totalPages;
  
    const handlePageChange = (selectedItem: { selected: number }) => {
      setSearchParams((params) => ({
        ...params,
        page: (selectedItem.selected + 1).toString(),
      }));
    };
  

  
    const handleSortChange = (sortOrder: string | undefined) => {
      setSort(sortOrder);
    };
  
    if (isLoading) return <div className="flex items-center justify-center w-full bg-white dark:bg-darkMode1"><Loading variant="blue" /></div> ;
    if (error)
      return (
        <div className="text-center">
          <p>Failed to load the books. Please try again later.</p>
          <button onClick={() => window.location.reload()} className="btn-retry">
            Retry
          </button>
        </div>
      );

  return (
    <div className="w-full bg-white dark:bg-darkMode1">
    <div className="flex justify-between items-center mx-3 md:mx-[100px] my-5">
      <div className="flex items-center gap-5">
        <div className="p-[7px] border rounded">
          <RiFilter3Line className="text-[16px] md:text-[24px] text-black dark:text-white" />
        </div>
        <div className="px-1 py-2 border rounded md:px-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center w-[150px] select-none justify-between gap-1 text-xs md:px-2 md:gap-5 md:text-sm text-black dark:text-white">
              <p>{sort ? "Sort by A-Z" : "Sort by default"}</p>
              <IoIosArrowDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-darkMode1 w-[150px] flex flex-col gap-3 select-none border px-4 rounded py-2 text-black dark:text-white">
              <DropdownMenuItem
               className="flex items-center gap-2 "
                onClick={() => handleSortChange(undefined)}
              >
                <input type="radio" checked={sort !== "a-z"} />
                <label htmlFor="latest" className="text-sm font-primary">Sort by latest</label>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 " onClick={() => handleSortChange("a-z")}>
                <input type="radio" checked={sort === "a-z"} />
                <label htmlFor="latest" className="text-sm font-primary">Sort by A-Z</label>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <div className="relative">
          <IoIosSearch
            className="absolute left-2 top-2 md:top-[10px] text-[16px] md:text-[24px] text-black dark:text-white"
            color="gray"
          />
          <Input
            type="search"
            className="text-black bg-white pl-7 md:pl-12 dark:text-white dark:bg-darkMode1"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInput}
            aria-label="Search books"
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 py-5 mx-10 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mx-4">
      <LibraryBookCard books={books} />
    </div>
    <Paginate
      breakLabel="..."
      nextLabel={currentPage === pageCount ? null : "Next >"}
      onPageChange={handlePageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={currentPage === 1 ? null : "< Prev"}
      renderOnZeroPageCount={null}
      containerClassName="flex list-none justify-center p-4"
      pageLinkClassName="px-3 font-primary py-1 border rounded active:bg-default active:text-white transition-colors duration-200 text-black dark:text-white"
      previousLinkClassName={currentPage === 1 ? "" : "px-3  mr-2 py-1 border rounded active:bg-default active:text-white transition-colors duration-200 text-black dark:text-white"}
      nextLinkClassName= {currentPage === pageCount ? "" : "px-3 py-1 ml-2 border rounded active:bg-default active:text-white transition-colors duration-200 text-black dark:text-white"}
      breakLinkClassName="px-3 py-1 border rounded active:bg-default active:text-white transition-colors duration-200"
      activeLinkClassName="bg-default text-white px-3 py-1 border rounded"
    />
  </div>
  )
}

export default LibBookSection
import { useCategory } from "@/contexts/CategoryContext";
import { useLibraryContext } from "@/contexts/LibraryContext";
import { useFetchBooks } from "@/hooks/useBookApi";
import { useDebounce } from "react-use";
import { RiFilter3Line } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import LibraryBookCard from "./LibraryBookCard";
import { Input } from "../ui/input";

const BookSection = () => {
  const {
    currentPage,
    searchInput,
    setSearchInput,
    searchTitle,
    setSearchTitle,
    sort,
    setSort,
  } = useLibraryContext();
  const { selectedCategories } = useCategory();
  const { data, error } = useFetchBooks(
    currentPage,
    searchTitle,
    selectedCategories,
    sort
  );

  const books = data?.items ?? [];

  useDebounce(() => setSearchTitle(searchInput), 1000, [searchInput]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSortChange = (sortOrder: string | undefined) => {
    setSort(sortOrder);
  };
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
                  <label htmlFor="latest" className="text-sm font-primary">
                    Sort by latest
                  </label>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 "
                  onClick={() => handleSortChange("a-z")}
                >
                  <input type="radio" checked={sort === "a-z"} />
                  <label htmlFor="latest" className="text-sm font-primary">
                    Sort by A-Z
                  </label>
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
    </div>
  );
};

export default BookSection;

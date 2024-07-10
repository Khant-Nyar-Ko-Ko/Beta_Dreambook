import { useCategory } from "@/contexts/CategoryContext";
import { useLibraryContext } from "@/contexts/LibraryContext";
import { useFetchBooks } from "@/hooks/useBookApi";
import { useDebounce } from "react-use";
import { RiFilter3Line } from "react-icons/ri";
import LibraryBookCard from "./LibraryBookCard";
import SortDropdown from "../SortDropdown";
import SearchInput from "../SearchInput";

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

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
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
        <div className="z-10 flex items-center gap-5">
          <div className="p-[7px] border rounded">
            <RiFilter3Line className="text-[16px] md:text-[24px] text-black dark:text-white" />
          </div>
          <SortDropdown sort={sort} setSort={setSort} />
        </div>
        <div>
        <SearchInput
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search"
            ariaLabel="Search books"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 py-5 mx-10 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mx-4">
        <LibraryBookCard books={books} />
      </div>
    </div>
  );
};

export default BookSection;

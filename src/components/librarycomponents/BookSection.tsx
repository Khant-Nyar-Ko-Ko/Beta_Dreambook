import { useCategory } from "@/contexts/CategoryContext";
import { useLibraryContext } from "@/contexts/LibraryContext";
import { useFetchBooks } from "@/hooks/useBookApi";
import { useDebounce } from "react-use";
import { RiFilter3Line } from "react-icons/ri";
import LibraryBookCard from "./LibraryBookCard";
import SortDropdown from "../SortDropdown";
import SearchInput from "../SearchInput";
import EmptyBookPage from "../EmptyBookPage";
import { Button } from "../ui/button";
import { useState } from "react";
import CategoryDrawer from "./CategoryDrawer";
import CheckboxWithText from "../CheckboxWithText";

const BookSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  console.log(books);
  

  useDebounce(() => setSearchTitle(searchInput), 1000, [searchInput]);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if(books.length == 0){
    return( <EmptyBookPage/>)
  }


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
    <div className="w-full overflow-y-auto h-[400px] bg-white dark:bg-darkMode1">
      <div className="flex justify-between items-center mx-3 md:mx-[100px] my-5">
        <div className="z-10 flex items-center gap-5">
          <div className="p-[7px] border rounded hidden md:block">
            <RiFilter3Line className="text-[16px] md:text-[24px] text-black dark:text-white" />
          </div>
            <Button className="block text-xs md:hidden" onClick={toggleDrawer}>Select Category</Button>
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
      <CategoryDrawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <div className="flex flex-col items-center gap-2 pb-5">
          <h2 className="pb-3 text-lg font-semibold text-black dark:text-white">Select Category</h2>
          <div className=" text-start">

          <CheckboxWithText/>
          </div>
        </div>
      </CategoryDrawer>
    </div>
  );
};

export default BookSection;

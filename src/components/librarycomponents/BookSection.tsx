import { useCategory } from "@/contexts/CategoryContext";
import { useLibraryContext } from "@/contexts/LibraryContext";
import { useFetchBooks } from "@/hooks/useBookApi";
import LibraryBookCard from "./LibraryBookCard";
import CategoryDrawer from "./CategoryDrawer";
import CheckboxWithText from "./CheckboxWithText";
import LibPagination from "./LibPagination";
import LibraryHeader from "./LibraryHeader";
import { Loader2 } from "lucide-react";

const BookSection = () => {
  const { currentPage, searchTitle, sort, isDrawerOpen, toggleDrawer } =
    useLibraryContext();
  const { selectedCategories } = useCategory();
  const { data, error, isLoading } = useFetchBooks(
    currentPage,
    searchTitle,
    selectedCategories,
    sort
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const books = data?.items ?? [];
  const pageCount = data?.meta?.totalPages;

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-[600px]">
        <Loader2 className="animate-spin" color="blue" />;
      </div>
    );
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
    <div className="w-full bg-white dark:bg-darkMode1">
      <LibraryHeader />
      <div className="overflow-y-auto md:h-auto h-[500px] my-5">
        <div className="grid justify-center w-full grid-cols-1 gap-1 px-20 md:px-15 md:mx-0 md:gap-6 md:py-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <LibraryBookCard books={books} />
        </div>

        <CategoryDrawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
          <div className="flex flex-col items-center gap-2 pb-5">
            <h2 className="pb-3 text-lg font-semibold text-black dark:text-white">
              Select Category
            </h2>
            <div className="text-start">
              <CheckboxWithText />
            </div>
          </div>
        </CategoryDrawer>

        <LibPagination pageCount={pageCount} />
      </div>
    </div>
  );
};

export default BookSection;

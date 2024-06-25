import { useFetchBooks } from "@/hooks/useBookApi";
import BookSection from "./BookSection";
import LibPagination from "./LibPagination";
import Loading from "../Loading";

const LibBookSection = () => {
  const { data, isLoading } = useFetchBooks();
  const pageCount = data?.meta?.totalPages;

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full bg-white dark:bg-darkMode1">
        <Loading variant="blue" />
      </div>
    );

  return (
    <div className="flex flex-col ">
      <BookSection />
      <LibPagination pageCount={pageCount} />
    </div>
  );
};

export default LibBookSection;

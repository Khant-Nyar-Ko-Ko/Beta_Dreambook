import BookSection from "./BookSection";
// import LibPagination from "./LibPagination";
// import { useLibraryContext } from "@/contexts/LibraryContext";

const LibBookSection = () => {
  
  // const {pageCount} = useLibraryContext();

  return (
    <div className="flex flex-col w-full bg-white dark:bg-darkMode1">
      <BookSection />
    </div>
  );
};

export default LibBookSection;

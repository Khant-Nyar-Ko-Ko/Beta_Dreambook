/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLibraryContext } from "@/contexts/LibraryContext";
import Paginate from "react-paginate";


const LibPagination = ({pageCount} : {pageCount : number}) => {
    const {currentPage, setCurrentPage} = useLibraryContext();

    const handlePageChange = (selectedItem : any) => {
        setCurrentPage(selectedItem.selected + 1);
      };

  return (
    <>
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
        previousLinkClassName={
          currentPage === 1
            ? ""
            : "px-3  mr-2 py-1 border rounded active:bg-default active:text-white transition-colors duration-200 text-black dark:text-white"
        }
        nextLinkClassName={
          currentPage === pageCount
            ? ""
            : "px-3 py-1 ml-2 border rounded active:bg-default active:text-white transition-colors duration-200 text-black dark:text-white"
        }
        breakLinkClassName="px-3 py-1 border rounded active:bg-default active:text-white transition-colors duration-200"
        activeLinkClassName="bg-default text-white px-3 py-1 border rounded"
      />
    </>
  );
};

export default LibPagination;

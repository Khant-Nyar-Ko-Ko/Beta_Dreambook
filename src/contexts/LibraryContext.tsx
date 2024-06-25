/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from "react";

const LibraryContext = createContext<any>(null);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sort, setSort] = useState();

  return (
    <LibraryContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        searchInput,
        setSearchInput,
        searchTitle,
        setSearchTitle,
        sort,
        setSort,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLibraryContext = () => useContext(LibraryContext);

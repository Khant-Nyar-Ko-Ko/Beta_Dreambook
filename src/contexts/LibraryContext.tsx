/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const LibraryContext = createContext<any>(null);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    page: "1",
    title: "",
    categoryIds:"[]"
  })
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || "1");
  const [searchInput, setSearchInput] = useState();
  const [searchTitle, setSearchTitle] = useState(searchParams.get("title") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(JSON.parse(searchParams.get("categoryIds") || "[]"));

  useEffect(() => {
    setSearchParams({
      sort,
      page: currentPage,
      title: searchTitle,
      categoryIds: JSON.stringify(selectedCategories),
    });
  }, [sort, currentPage, searchTitle, selectedCategories, setSearchParams]);


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
        selectedCategories,
        setSelectedCategories
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLibraryContext = () => useContext(LibraryContext);

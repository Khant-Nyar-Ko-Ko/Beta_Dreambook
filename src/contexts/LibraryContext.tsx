/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const LibraryContext = createContext<any>(null);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    page: "1",
    title: "",
    categoryIds: "[]"
  });

  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1", 10));
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>(searchParams.get("title") || "");
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "latest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(JSON.parse(searchParams.get("categoryIds") || "[]"));
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam && parseInt(pageParam, 10) !== currentPage) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      sort,
      page: currentPage.toString(),
      title: searchTitle,
      categoryIds: JSON.stringify(selectedCategories),
    });
  }, [sort, currentPage, searchTitle, selectedCategories, setSearchParams]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const value = useMemo(() => ({
    currentPage,
    setCurrentPage,
    searchInput,
    setSearchInput,
    searchTitle,
    setSearchTitle,
    sort,
    setSort,
    selectedCategories,
    setSelectedCategories,
    toggleDrawer,
    isDrawerOpen
  }), [
    currentPage,
    searchInput,
    searchTitle,
    sort,
    selectedCategories,
    isDrawerOpen
  ]);

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLibraryContext = () => useContext(LibraryContext);

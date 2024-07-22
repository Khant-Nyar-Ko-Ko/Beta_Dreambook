/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../tools/Card";
import EmptyBookPage from "../tools/EmptyBookPage";
import { useFetchFavourite } from "@/hooks/useFavouriteApi";
import { useEffect, useState } from "react";
import SortDropdown from "../tools/SortDropdown";
import { useDebounce } from "react-use";
import SearchInput from "../additional/SearchInput";
import { useSearchParams } from "react-router-dom";
import CardLoading from "../Loading/CardLoading";
import { motion } from "framer-motion";

const FavBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    title: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchTitle, setSearchTitle] = useState(searchParams.get("title") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");

  useDebounce(() => setSearchTitle(searchInput), 1000, [searchInput]);
  const {
    data: favouriteBooks,
    isLoading,
    error,
    refetch,
  } = useFetchFavourite(sort, searchTitle);

  useEffect(() => {
    setSearchParams({
      sort,
      title: searchTitle,
    });
  }, [sort, searchTitle, setSearchParams]);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSortChange = (sortOrder: string | undefined) => {
    setSort(sortOrder ?? "");
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favouriteBooks]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-4/5 h-full px-3 py-5 bg-white dark:bg-darkMode1">
        <motion.div
          className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
            <SortDropdown sort={sort} setSort={handleSortChange} />
          </div>
          <SearchInput
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search"
            ariaLabel="Search books"
          />
        </motion.div>
        <div className="flex justify-center items-center overflow-y-auto  h-[500px] md:w-[1110px] mx-4">
          <CardLoading />
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error loading books:", error);
    return <div>Error loading books</div>;
  }

  return (
    <motion.div
      className="flex flex-col w-4/5 h-full px-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-start justify-between w-full gap-2 my-2 md:flex-row md:items-center md:gap-5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
          <SortDropdown sort={sort} setSort={handleSortChange} />
        </div>
        <div className="order-2 w-full md:order-1 md:mt-0 md:w-auto">
          <SearchInput
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search"
            ariaLabel="Search books"
          />
        </div>
      </motion.div>
      {!favouriteBooks || favouriteBooks.length === 0 ? (
        <EmptyBookPage />
      ) : (
        <motion.div
          className="grid h-[600px] overflow-y-auto items-center md:items-start justify-center grid-cols-1 gap-10 mx-5 my-10 md:mx-20 md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {favouriteBooks?.map(
            ({
              book: { id, title, coverImg, category, slug, favouriteCount, chapterNum, user: { profileImg, name, id: userId } },
            }: {
              book: {
                id: any;
                title: string;
                coverImg: string;
                category: any;
                slug: string;
                favouriteCount: number;
                chapterNum: number;
                user: {
                  profileImg: string;
                  name: string;
                  id: any;
                };
              };        
            })  => (
              <motion.div
                key={id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  id={id}
                  slug={slug}
                  title={title}
                  image={coverImg}
                  categorylogo={category.icon}
                  categorytitle={category.title}
                  author={name}
                  authorprofile={profileImg}
                  authorId={userId}
                  favouriteCount={favouriteCount}
                  chapterNum={chapterNum}
                />
              </motion.div>
            )
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FavBooks;

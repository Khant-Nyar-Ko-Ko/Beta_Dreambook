import { RiFilter3Line } from "react-icons/ri";
import EmptyBookPage from "../tools/EmptyBookPage";
import { useFetchHistory } from "@/hooks/useHistoryApi";
import Card from "../tools/Card";
import SortDropdown from "../tools/SortDropdown";
import { useDebounce } from "react-use";
import SearchInput from "../SearchInput";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardLoading from "../Loading/CardLoading";
import { motion } from "framer-motion";

const History = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    title: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchTitle, setSearchTitle] = useState(searchParams.get("title") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");

  useEffect(() => {
    setSearchParams({
      sort,
      title: searchTitle,
    });
  }, [sort, searchTitle, setSearchParams]);

  useDebounce(() => setSearchTitle(searchInput), 1000, [searchInput]);
  const { data, isLoading, error } = useFetchHistory(sort, searchTitle);
  const bookHistory = data?.items || [];

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSortChange = (sortOrder: string | undefined) => {
    setSort(sortOrder ?? "");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-4/5 h-full px-3 py-5 bg-white dark:bg-darkMode1">
        <div className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5">
          <motion.div
            className="flex items-center w-full gap-3 md:gap-5 md:w-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-[7px] border rounded">
              <RiFilter3Line className="text-[16px] md:text-[24px]" />
            </div>
            <SortDropdown sort={sort} setSort={handleSortChange} />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SearchInput
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search"
              ariaLabel="Search books"
            />
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center items-center overflow-y-auto h-[500px] md:w-[1110px] mx-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardLoading />
        </motion.div>
      </div>
    );
  }

  if (error) {
    console.error("Error loading books:", error);
    return <div>Error loading books</div>;
  }

  const isBookHistoryArray = Array.isArray(bookHistory);

  return (
    <div className="flex flex-col w-4/5 h-full px-3 my-5">
      <motion.div
        className="flex items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center w-full gap-3 md:gap-5 md:w-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <SortDropdown sort={sort} setSort={handleSortChange} />
        </motion.div>
        <motion.div
          className="order-2 w-full md:order-1 md:mt-0 md:w-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SearchInput
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search"
            ariaLabel="Search books"
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="h-[600px] overflow-y-scroll my-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {!isBookHistoryArray || bookHistory.length === 0 ? (
          <EmptyBookPage />
        ) : (
          <div className="grid h-[600px] overflow-y-auto items-center md:items-start justify-center grid-cols-1 mx-5 my-10 md:mx-20 md:grid-cols-4">
            {bookHistory.map(
              ({
                id,
                book: { id: bookId, title, coverImg, slug, category, favouriteCount, chapterNum },
                user: { id: userId, name, profileImg },
              }: {
                id: number;
                book: {
                  id: number;
                  title: string;
                  coverImg: string;
                  slug: string;
                  category: { title: string; icon: string };
                  favouriteCount: number;
                  chapterNum: number;
                };
                user: { id: number; name: string; profileImg: string };
              }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card
                    id={bookId}
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
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default History;

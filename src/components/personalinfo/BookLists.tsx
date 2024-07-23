import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { useFetchBooksByLoginUser } from "@/hooks/useBookApi";
import SearchInput from "../additional/SearchInput";
import { useDebounce } from "react-use";
import SortDropdown from "../tools/SortDropdown";
import EmptyBookPage from "../tools/EmptyBookPage";
import CardUser from "../tools/CardUser";
import { usePersonalInfoContext } from "@/contexts/PersonalInfoContext";
import CardLoading from "../Loading/CardLoading";
import { motion } from "framer-motion";

interface Book {
  id: string;
  title: string;
  coverImg: string;
  category: { icon: string; title: string };
  user: { name: string; profileImg: string };
  slug: string;
  status: boolean;
  favouriteCount: number;
  chapterNum: number;
}

const BookLists = () => {
  const {
    searchInput,
    setSearchInput,
    searchTitle,
    setSearchTitle,
    sort,
    setSort,
  } = usePersonalInfoContext();

  const { data, isLoading, refetch } = useFetchBooksByLoginUser(sort, searchTitle);
  const userBooks: Book[] | undefined = data?.items;

  useDebounce(() => setSearchTitle(searchInput), 1000, [searchInput]);

  const handleSearchInputChange = (value: string | undefined) => {
    setSearchInput(value);
  };

  const handleSortChange = (sortOrder: string | undefined) => {
    setSort(sortOrder);
  };

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userBooks]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-4/5 h-full px-3 py-5 bg-white dark:bg-darkMode1">
        <div className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5">
          <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
            <SortDropdown sort={sort} setSort={handleSortChange} />
            <NavLink to="/bookcrafting">
              <Button size="sm" className="flex gap-2">
                <FaPlus />
                <p className="text-xs md:text-base">Create Book</p>
              </Button>
            </NavLink>
          </div>
          <SearchInput
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search"
            ariaLabel="Search books"
          />
        </div>
        <div className="flex justify-center items-center overflow-y-auto h-[500px] md:w-[1110px] mx-4">
          <CardLoading />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col w-4/5 h-full px-3 py-5 bg-white dark:bg-darkMode1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
          <SortDropdown sort={sort} setSort={handleSortChange} />
          <NavLink to="/bookcrafting">
            <Button className="flex gap-2">
              <FaPlus />
              <p className="text-xs md:text-base">Create Book</p>
            </Button>
          </NavLink>
        </div>
        <SearchInput
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search"
          ariaLabel="Search books"
        />
      </motion.div>
      <motion.div
        className="h-[600px] overflow-y-scroll my-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {!userBooks || userBooks.length === 0 || data === "bookDeleted" ? (
          <EmptyBookPage />
        ) : (
          <div className="grid items-center justify-center grid-cols-1 gap-10 mx-5 my-10 overflow-y-auto md:h-auto md:items-start md:mx-20 md:grid-cols-4">
            {userBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CardUser
                  id={Number(book.id)}
                  slug={book.slug}
                  title={book.title}
                  image={book.coverImg}
                  status={book.status}
                  categorylogo={book.category.icon}
                  categorytitle={book.category.title}
                  author={book.user.name}
                  authorprofile={book.user.profileImg}
                  favouriteCount={book.favouriteCount}
                  chapterNum={book.chapterNum}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookLists;

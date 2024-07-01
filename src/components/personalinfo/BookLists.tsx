import { RiFilter3Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useFetchBooksByLoginUser } from "@/hooks/useBookApi";
import Card from "../Card";
import SearchInput from "../SearchInput";
import { useDebounce } from "react-use";
import { useEffect, useState } from "react";
import SortDropdown from "../SortDropdown";
import EmptyBookPage from "../EmptyBookPage";

const BookLists = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sort, setSort] = useState<string | undefined>();
  const { data } = useFetchBooksByLoginUser(sort);
  const userBooks = data?.items;
  console.log(searchTitle);

  useDebounce(() => setSearchTitle(searchInput), 1000, [searchInput]);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSortChange = (sortOrder: string | undefined) => {
    setSort(sortOrder);
  };

  useEffect(() => {
    console.log("userBooks: ", userBooks);
  }, [userBooks]);

  return (
    <div className="flex flex-col w-4/5 h-full px-3 py-5 bg-white dark:bg-darkMode1">
      <div className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5">
        <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
          <div className="p-[7px] border rounded">
            <RiFilter3Line className="text-[16px] md:text-[24px]" />
          </div>
          <SortDropdown sort={sort} setSort={handleSortChange} />
          <NavLink to="/bookcrafting">
            <Button className="flex gap-2">
              <FaPlus />
              <p className="text-xs md:text-base">Create Book</p>
            </Button>
          </NavLink>
        </div>
        <div className="order-2 w-full mt-3 md:order-1 md:mt-0 md:w-auto">
          <SearchInput
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search"
            ariaLabel="Search books"
          />
        </div>
      </div>
      {!userBooks || userBooks.length === 0 || data == "bookDeleted" ? (
        <EmptyBookPage/>
      ) : (
        <div className="grid items-center justify-center grid-cols-4 gap-10 mx-20 my-10">
          {userBooks.map(
            ({
              id,
              title,
              coverImg,
              category,
              user,
              slug
            }: {
              id: string;
              title: string;
              coverImg: string;
              category: { icon: string; title: string };
              user: { name: string; profileImg: string };
              slug: string
            }) => {
              return (
                <Card
                  key={id}
                  id={Number(id)}
                  slug={slug}
                  title={title}
                  image={coverImg}
                  categorylogo={category.icon}
                  categorytitle={category.title}
                  author={user.name}
                  authorprofile={user.profileImg}
                />
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default BookLists;

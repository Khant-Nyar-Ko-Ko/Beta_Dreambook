/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiFilter3Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useFetchBooksByLoginUser } from "@/hooks/useBookApi";
import Card from "../Card";
import SearchInput from "../SearchInput";
import { useDebounce } from "react-use";
import { useState } from "react";
// import SortDropdown from "../SortDropdown";

const BookLists = () => {
  const { data } = useFetchBooksByLoginUser();
  const userBooks = data?.items;
  const [searchInput, setSearchInput] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  console.log(searchTitle);
  

  useDebounce(() => setSearchTitle(searchInput), 1000, [searchInput]);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  return (
    <div className="flex flex-col w-4/5 h-full px-3 py-5 bg-white dark:bg-darkMode1">
      <div className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5">
        <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
          <div className="p-[7px] border rounded">
            <RiFilter3Line className="text-[16px] md:text-[24px]" />
          </div>
          {/* <SortDropdown sort={sort} setSort={setSort} /> */}
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
      {!userBooks || userBooks.length === 0 || userBooks == "" ? (
        <div className="flex flex-col w-4/5 h-full px-3 py-5 bg-white dark:bg-darkMode1">
          <iframe
            src="https://lottie.host/embed/8866455b-434f-412d-863b-334f6c5c5724/EzyvqFxRUM.json"
            className="w-full h-32 md:h-96"
            title="Animation"
          ></iframe>
          <p className="mt-3 text-center opacity-50 font-primary">
            "Discover literary treasures: Explore our curated book lists
            collection today."
          </p>
        </div>
      ) : (
        <div className="grid items-center justify-center grid-cols-4 gap-10 mx-20 my-10">
          {userBooks.map(
            ({
              id,
              title,
              coverImg,
              category,
              user,
            }: {
              id: any;
              title: string;
              coverImg: string;
              category: any;
              user: any;
            }) => {
              return (
                <Card
                  key={id}
                  id={id}
                  title={title}
                  image={coverImg}
                  categorylogo={category?.icon}
                  categorytitle={category?.title}
                  author={user?.name}
                  authorprofile={user?.profileImg}
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

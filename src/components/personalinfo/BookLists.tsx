import { RiFilter3Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useFetchBooksByLoginUser } from "@/hooks/useBookApi";
import SearchInput from "../SearchInput";
import { useDebounce } from "react-use";
import { useEffect } from "react";
import SortDropdown from "../SortDropdown";
import EmptyBookPage from "../EmptyBookPage";
import CardUser from "../CardUser";
import Loading from "../Loading";
import { usePersonalInfoContext } from "@/contexts/PersonalInfoContext";

const BookLists = () => {
  const {
    searchInput,
    setSearchInput,
    searchTitle,
    setSearchTitle,
    sort,
    setSort,
  } = usePersonalInfoContext();

  const { data , isLoading, refetch } = useFetchBooksByLoginUser(sort, searchTitle);
  const userBooks = data?.items;
  console.log(searchTitle);

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
    return <div className=" flex justify-center items-center h-[500px] w-[1110px]"><Loading variant="blue"/></div>;
  }

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
        <SearchInput
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search"
            ariaLabel="Search books"
          />
      </div>
      <div className=" h-[600px] overflow-y-scroll my-3">
      {!userBooks || userBooks.length === 0 || data == "bookDeleted" ? (
        <EmptyBookPage/>
      ) : (
        <div className="grid  h-[600px] overflow-y-auto items-center md:items-start justify-center grid-cols-1 gap-10 mx-5 my-10 md:mx-20 md:grid-cols-4">
          {userBooks.map(
            ({
              id,
              title,
              coverImg,
              category,
              user,
              slug,
              status,
              favouriteCount,
              chapterNum
            }: {
              id: string;
              title: string;
              coverImg: string;
              category: { icon: string; title: string };
              user: { name: string; profileImg: string };
              slug: string;
              status: boolean;
              favouriteCount: number;
              chapterNum: number;
            }) => {
              return (
                <CardUser
                  key={id}
                  id={Number(id)}
                  slug={slug}
                  title={title}
                  image={coverImg}
                  status={status}
                  categorylogo={category.icon}
                  categorytitle={category.title}
                  author={user.name}
                  authorprofile={user.profileImg}
                  favouriteCount={favouriteCount}
                  chapterNum={chapterNum}
                />
              );
            }
          )}
        </div>
      )}
      </div>
 
    </div>
  );
};

export default BookLists;

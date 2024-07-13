/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiFilter3Line } from "react-icons/ri";
import Card from "../Card";
import EmptyBookPage from "../EmptyBookPage";
import { useFetchFavourite } from "@/hooks/useFavouriteApi";
import { useEffect, useState } from "react";
import SortDropdown from "../SortDropdown";
import Loading from "../Loading";
import { useDebounce } from "react-use";
import SearchInput from "../SearchInput";
import { useSearchParams } from "react-router-dom";

const FavBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    title: "",
  })
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
  console.log(favouriteBooks);

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
      <div className=" flex justify-center items-center h-[500px] w-[1110px]">
        <Loading variant="blue" />
      </div>
    );
  }

  if (error) {
    console.error("Error loading books:", error);
    return <div>Error loading books</div>;
  }

  return (
    <div className="flex flex-col w-4/5 h-full px-3 my-5">
      <div className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5">
        <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
          <div className="p-[7px] border rounded">
            <RiFilter3Line className="text-[16px] md:text-[24px]" />
          </div>
          <SortDropdown sort={sort} setSort={handleSortChange} />
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
      {!favouriteBooks || favouriteBooks.length === 0 ? (
        <EmptyBookPage />
      ) : (
        <div className="grid items-center justify-center grid-cols-4 gap-10 mx-20 my-10">
          {favouriteBooks?.map(
            ({
              book: { id, title, coverImg, category, user, slug },
            }: {
              book: {
                id: any;
                title: string;
                coverImg: string;
                category: any;
                user: any;
                slug: string;
              };
            }) => (
              <Card
                key={id}
                id={id}
                slug={slug}
                title={title}
                image={coverImg}
                categorylogo={category?.icon}
                categorytitle={category?.title}
                author={user?.name}
                authorprofile={user?.profileImg}
                authorId={user?.id}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FavBooks;

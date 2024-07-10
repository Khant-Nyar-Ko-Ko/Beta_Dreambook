import { RiFilter3Line } from "react-icons/ri";
import EmptyBookPage from "../EmptyBookPage";
import { useFetchHistory } from "@/hooks/useHistoryApi";
import Card from "../Card";
import SortDropdown from "../SortDropdown";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const History = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    title: "",
  });
  const [sort, setSort] = useState<string | undefined>(
    searchParams.get("sort") || "latest"
  );
  // const [searchInput, setSearchInput] = useState();
  // const [searchTitle, setSearchTitle] = useState(
  //   searchParams.get("title") || ""
  // );
  const { data, isLoading, error } = useFetchHistory(sort);
  const bookhistory = data?.items || [];

  // useDebounce(() => setSearchTitle(searchInput), 1000, [searchInput]);

  // const handleSearchInputChange = (value: string) => {
  //   setSearchInput(value);
  // };

  console.log("Fetched history data:", bookhistory);

  useEffect(() => {
    if (sort) {
      setSearchParams({ sort });
    } else {
      setSearchParams({});
    }
  }, [sort, setSearchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error loading books:", error);
    return <div>Error loading books</div>;
  }

  const isBookHistoryArray = Array.isArray(bookhistory);

  return (
    <div className="flex flex-col w-4/5 h-full px-3 my-5">
      <div className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5">
        <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
          <div className="p-[7px] border rounded">
            <RiFilter3Line className="text-[16px] md:text-[24px]" />
          </div>
          <SortDropdown sort={sort} setSort={setSort} />
        </div>
        <div className="order-2 w-full mt-3 md:order-1 md:mt-0 md:w-auto">
          <div>
            {/* <SearchInput
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search"
              ariaLabel="Search books"
            /> */}
          </div>
        </div>
      </div>
      <div className="h-[600px] overflow-y-scroll my-3">
        {!isBookHistoryArray || bookhistory.length === 0 ? (
          <EmptyBookPage />
        ) : (
          <div className="grid items-center justify-center grid-cols-4 gap-10 mx-20 my-10">
            {bookhistory.map(
              ({
                id,
                bookId,
                book,
                user,
              }: {
                id: number;
                bookId: number;
                book: {
                  id: number;
                  title: string;
                  coverImg: string;
                  slug: string;
                  category: { title: string; icon: string };
                };
                user: { name: string; profileImg: string; id: number };
              }) => {
                return (
                  <Card
                    key={id}
                    id={bookId}
                    slug={book?.slug}
                    title={book?.title}
                    image={book?.coverImg}
                    categorylogo={book.category?.icon}
                    categorytitle={book?.category?.title}
                    author={user.name}
                    authorprofile={user.profileImg}
                    authorId={user.id}
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

export default History;

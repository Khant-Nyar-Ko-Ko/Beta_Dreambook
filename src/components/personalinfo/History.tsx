import { RiFilter3Line } from "react-icons/ri";
import EmptyBookPage from "../EmptyBookPage";
import { useFetchHistory } from "@/hooks/useHistoryApi";
import Card from "../Card";
import SortDropdown from "../SortDropdown";
import Loading from "../Loading";
import { useDebounce } from "react-use";
import SearchInput from "../SearchInput";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const History = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    title: "",
  })
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
  const bookhistory = data?.items || [];



  console.log("Fetched history data:", bookhistory);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSortChange = (sortOrder: string | undefined) => {
    setSort(sortOrder ?? "");
  };


  if (isLoading) {
    return <div className=" flex justify-center items-center h-[500px] w-[1110px]"><Loading variant="blue"/></div>;
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
      <div className="h-[600px] overflow-y-scroll my-3">
        {!isBookHistoryArray || bookhistory.length === 0 ? (
          <EmptyBookPage />
        ) : (
          <div className="grid  h-[600px] overflow-y-auto items-center md:items-start justify-center grid-cols-1 gap-10 mx-5 my-10 md:mx-20 md:grid-cols-4">
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

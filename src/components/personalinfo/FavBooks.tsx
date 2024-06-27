/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosSearch } from "react-icons/io";
import { RiFilter3Line } from "react-icons/ri";
import { Input } from "../ui/input";
import { useFetchBooks } from "@/hooks/useBookApi";
import Card from "../Card";
import { useFavouriteBooks } from "@/contexts/FavouriteBooksContext";
import SortDropdown from "../SortDropdown";
import { useState } from "react";

const FavBooks = () => {
  const { favouriteBookIds } = useFavouriteBooks();
  const [sort, setSort] = useState<any | undefined>();
  const { data: books, error, isLoading } = useFetchBooks(sort);

  const favoriteBookIds = favouriteBookIds;

  const favouriteBooks = books?.items.filter((book: any) =>
    favoriteBookIds?.includes(book.id)
  );

  const handleSortChange = (sortOrder: string | undefined) => {
    setSort(sortOrder);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error loading books:", error);
    return <div>Error loading books</div>;
  }

  if (!books.items || books.items.length === 0 || books.items == "")  {
    return (
      <div className="flex flex-col items-center justify-center mt-20 md:mt-0">
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
    );
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
          <div className="relative">
            <IoIosSearch
              className="absolute left-2 top-2 md:top-[10px] text-[16px] md:text-[24px]"
              color="gray"
            />
            <Input
              type="search"
              className="w-full pl-7 md:pl-12 md:w-auto"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="grid items-center justify-center grid-cols-4 gap-10 mx-20 my-10">
        {favouriteBooks.map(
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
    </div>
  );
};

export default FavBooks;

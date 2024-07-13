/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddFavourite, useRemoveFavourite } from "@/hooks/useFavouriteApi";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
// import { useSearchParams } from "react-router-dom";

// interface FavouriteContextType {
//   favouriteBookIds: number[];
//   addFavouriteBook: (id: number) => void;
//   removeFavouriteBook: (id: number) => void;
//   searchInput: string | undefined;
//   setSearchInput: Dispatch<SetStateAction<undefined>>;
//   searchTitle: string;
//   setSearchTitle: Dispatch<SetStateAction<string>>;
//   sort: string;
//   setSort: Dispatch<SetStateAction<string>>;
// }

const FavouriteBooksContext = createContext<any>(
  undefined
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FavouriteBooksProvider = ({ children }: { children: ReactNode }) => {
  // const [searchParams, setSearchParams] = useSearchParams({
  //   sort: "latest",
  //   title: "",
  // });
  // const [searchInput, setSearchInput] = useState();
  // const [searchTitle, setSearchTitle] = useState(
  //   searchParams.get("title") || ""
  // );
  // const [sort, setSort] = useState(searchParams.get("sort") || "latest");

  const [favouriteBookIds, setFavouriteBookIds] = useState<number[]>(() => {
    const savedFavorites = Cookies.get("favouriteBookIds");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const { mutate: addFavouriteBookApi } = useAddFavourite();
  const { mutate: removeFavouriteBookApi } = useRemoveFavourite();

  useEffect(() => {
    Cookies.set("favouriteBookIds", JSON.stringify(favouriteBookIds), {
      expires: 7,
    });
  }, [favouriteBookIds]);

  const addFavouriteBook = (id: number) => {
    addFavouriteBookApi(id);
    setFavouriteBookIds([...favouriteBookIds, id]);
  };
  const removeFavouriteBook = (bookId: number) => {
    removeFavouriteBookApi(bookId);
    setFavouriteBookIds(favouriteBookIds.filter((id) => id !== bookId));
  };

  return (
    <FavouriteBooksContext.Provider
      value={{
        favouriteBookIds,
        addFavouriteBook,
        removeFavouriteBook,
        // searchInput,
        // setSearchInput,
        // searchTitle,
        // setSearchTitle,
        // sort,
        // setSort,
      }}
    >
      {children}
    </FavouriteBooksContext.Provider>
  );
};

const useFavouriteBooks = () => {
  const context = useContext(FavouriteBooksContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { FavouriteBooksProvider, useFavouriteBooks };

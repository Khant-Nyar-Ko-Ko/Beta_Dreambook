import { useAddFavourite, useRemoveFavourite } from "@/hooks/useFavouriteApi";
import { createContext, ReactNode, useContext, useState } from "react";

interface FavouriteContextType {
  favouriteBookIds: number[];
  addFavouriteBook: (id: number) => void;
  removeFavouriteBook: (id: number) => void;
}

const FavouriteBooksContext = createContext<FavouriteContextType | undefined>(
  undefined
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FavouriteBooksProvider = ({ children }: { children: ReactNode }) => {
  const [favouriteBookIds, setFavouriteBookIds] = useState<number[]>([]);
  const { mutate: addFavouriteBookApi } = useAddFavourite();
  const { mutate: removeFavouriteBookApi } = useRemoveFavourite();

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
      value={{ favouriteBookIds, addFavouriteBook, removeFavouriteBook }}
    >
      {children}
    </FavouriteBooksContext.Provider>
  );
};

const useFavouriteBooks = () => {
    const context = useContext(FavouriteBooksContext);
    if (!context) {
        throw new Error
    }
    return context;
};

export { FavouriteBooksProvider, useFavouriteBooks };

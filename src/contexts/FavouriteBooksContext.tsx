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
import { useQueryClient } from "@tanstack/react-query";

const FavouriteBooksContext = createContext<any>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FavouriteBooksProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [favouriteBookIds, setFavouriteBookIds] = useState<number[]>(() => {
    const savedFavorites = Cookies.get("favouriteBookIds");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const refetchFavourite = () => {
    queryClient.invalidateQueries({ queryKey: ["favourite"] });
  };

  const { mutate: addFavouriteBookApi } = useAddFavourite();
  // const { mutate: removeFavouriteBookApi, isSuccess : isRemoveSuccess, status } = useRemoveFavourite();
  const removeMutation = useRemoveFavourite();

  useEffect(() => {
    Cookies.set("favouriteBookIds", JSON.stringify(favouriteBookIds), {
      expires: 7,
    });
  }, [favouriteBookIds]);

  useEffect(() => {
    if (removeMutation.isSuccess) {
      refetchFavourite();
    }
  }, [removeMutation.isSuccess]);

  const addFavouriteBook = (id: number) => {
    addFavouriteBookApi(id, {
      onSuccess: () => {
        refetchFavourite();
      },
    });
    setFavouriteBookIds([...favouriteBookIds, id]);
  };

  const removeFavouriteBook = (bookId: number) => {
    removeMutation.mutate(bookId);
    setFavouriteBookIds(favouriteBookIds.filter((id) => id !== bookId));
  };

  return (
    <FavouriteBooksContext.Provider
      value={{
        favouriteBookIds,
        addFavouriteBook,
        removeFavouriteBook,
        refetchFavourite,
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

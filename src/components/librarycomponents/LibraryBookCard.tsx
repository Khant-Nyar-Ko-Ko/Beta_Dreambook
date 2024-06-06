/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchBooks } from "@/hooks/useBookApi";
import Card from "../Card";


const LibraryBookCard = () => {
  const { data, error, isLoading } = useFetchBooks();
  const book = data?.items;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading books</div>;
  }

  if (!book || book.length === 0) {
    return <div>No popular books available</div>;
  }

  return (
    <>
      {book.map(
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
          const { name } = user;

          return (
            <Card
              key={id}
              id={id}
              title={title}
              image={coverImg}
              categorylogo={category?.icon}
              categorytitle={category?.title}
              author={name}
            />
          );
        }
      )}
    </>
  );
};

export default LibraryBookCard;

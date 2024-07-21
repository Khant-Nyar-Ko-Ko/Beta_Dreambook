/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../tools/Card";
import { useDebounce } from "react-use";
import { useLibraryContext } from "@/contexts/LibraryContext";


const LibraryBookCard = ({books} : {books : any[]}) => {
  const {
    setCurrentPage,
    searchInput,
    setSearchTitle,
  } = useLibraryContext();
  
  useDebounce(
    () => {
      setSearchTitle(searchInput), setCurrentPage("1");
    },
    1000,
    [searchInput]
  );

  return (
    <>
      {books.map(
        ({
          id,
          title,
          coverImg,
          category,
          user,
          slug,
          favouriteCount,
          chapterNum
        }: {
          id: any;
          title: string;
          coverImg: string;
          category: any;
          user: any;
          slug: string;
          favouriteCount: number;
          chapterNum: number;
        }) => {
          const { name, profileImg, id: authorId } = user;

          return (
            <Card
              key={id}
              id={id}
              slug={slug}
              title={title}
              image={coverImg}
              categorylogo={category?.icon}
              categorytitle={category?.title}
              author={name}
              authorprofile={profileImg}
              authorId={authorId}
              favouriteCount={favouriteCount}
              chapterNum={chapterNum}
            />
          );
        }
      )}
    </>
  );
};

export default LibraryBookCard;

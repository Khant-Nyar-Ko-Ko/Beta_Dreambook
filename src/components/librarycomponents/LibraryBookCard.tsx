/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../Card";


const LibraryBookCard = ({books} : {books : any[]}) => {

  return (
    <>
      {books.map(
        ({
          id,
          title,
          coverImg,
          category,
          user,
          slug
        }: {
          id: any;
          title: string;
          coverImg: string;
          category: any;
          user: any;
          slug: string
        }) => {
          const { name, profileImg } = user;

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
            />
          );
        }
      )}
    </>
  );
};

export default LibraryBookCard;

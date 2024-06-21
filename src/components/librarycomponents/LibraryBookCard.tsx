/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../Card";


const LibraryBookCard = ({books} : {books : any}) => {

  return (
    <>
      {books.map(
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
          const { name, profileImg } = user;

          return (
            <Card
              key={id}
              id={id}
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

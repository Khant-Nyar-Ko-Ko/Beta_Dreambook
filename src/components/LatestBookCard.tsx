import book20 from "../assets/images/Book 20.png";
import productivity from "../assets/images/categories/productivity.png";
import Card from "./Card";

const latestBooksData = [
  {
    id: 1,
    image: book20,
    title: "Best Self",
    categorylogo: productivity,
    categorytitle: "Productivity",
    author: "Dr. Phil McGraw",
  },
];
const LatestBookCard = () => {
  return (
    <>
      {latestBooksData?.map(
        ({ id, image, title, categorylogo, categorytitle, author }) => (
          <Card
            key={id}
            id={id}
            title={title}
            image={image}
            categorylogo={categorylogo}
            categorytitle={categorytitle}
            author={author}
          />
        )
      )}
    </>
  );
};

export default LatestBookCard;

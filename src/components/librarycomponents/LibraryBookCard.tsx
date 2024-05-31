import productivity from "../../assets/images/categories/productivity.png";
import Card from "../Card";
import book20 from "../../assets/images/Book 20.png";
import { useFetchBooks } from "@/hooks/useBookApi";


const popularBooksData = [
    {
      id: 1,
      image: book20,
      title: "Best Self",
      categorylogo: productivity,
      categorytitle: "Productivity",
      author: "Dr. Phil McGraw",
    },
  ];

const LibraryBookCard = () => {

  const { data : books } = useFetchBooks();
  console.log(books);

  return (
    <>
      {popularBooksData?.map(
        ({ id, title, image, categorylogo, categorytitle, author }) => (
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
  )
}

export default LibraryBookCard
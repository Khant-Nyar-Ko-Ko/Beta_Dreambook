import PopularBookCard from "./PopularBookCard";


const PopularBook = () => {
  return (
    <>
      <h4  className="text-lg text-center text-black md:text-2xl font-primary dark:text-white">
        Popular Books
      </h4>
      <div className="flex justify-center mx-10 md:mx-4 my-10 md:px-[120px]">
        <PopularBookCard />
      </div>
    </>
  );
};

export default PopularBook;

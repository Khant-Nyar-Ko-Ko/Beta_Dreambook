import book20 from "../assets/images/Book 20.png";
import productivity from "../assets/images/categories/productivity.png";
import authorprofile from "../assets/images/Author.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

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

const PopularBookCard = () => {

  const [toggleFav, setToggleFav] = useState(false);

  return (
    <>
      {popularBooksData?.map(
        ({ id, image, title, categorylogo, categorytitle, author }) => (
          <div
            key={id}
            className=" flex flex-col w-[230px] gap-5 h-[260px] pb-3 bg-white border border-slate-100 shadow-lg"
          >
            <div className="w-[200px] h-[130px] flex justify-center px-10 py-3 mx-3 mt-3 bg-slate-200 relative group overflow-hidden">
            <div className="absolute flex flex-col gap-3 duration-200 transform translate-x-10 group-hover:translate-x-0 right-3 top-10">
              <button
                onClick={() => setToggleFav(!toggleFav)}
                className="p-1 bg-white rounded-full"
              >
                {toggleFav ? <IoHeart className="text-red-500" /> : <IoMdHeartEmpty />}
              </button>
              <button className="p-1 bg-white rounded-full">
                <IoEyeOutline />
              </button>
            </div>
            <img src={image} alt={title} className="w-20 my-auto duration-200 group-hover:w-[75px]" />
          </div>
            <div className="flex flex-col gap-1 mx-3">
              <p className="font-semibold font-primary text-start">{title}</p>
              <div className="flex gap-1 ">
                <img
                  src={categorylogo}
                  className="w-4 h-4"
                  alt="categorylogo"
                />
                <p className="text-sm font-primary text-slate-500">
                  {categorytitle}
                </p>
              </div>
              <div className="flex items-center gap-2 ">
                <img
                  src={authorprofile}
                  className="w-6 h-6 rounded-full "
                  alt="author"
                />
                <p className="text-sm font-primary">By {author}</p>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default PopularBookCard;

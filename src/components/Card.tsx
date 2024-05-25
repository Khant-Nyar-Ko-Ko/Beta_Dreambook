import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline, IoHeart } from "react-icons/io5";
import authorprofile from "../assets/images/Author.png";

interface CardProps {
  id: number;
  title: string;
  image: string;
  categorylogo: string;
  categorytitle: string;
  author: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  image,
  categorylogo,
  categorytitle,
  author,
}) => {
  const [toggleFav, setToggleFav] = useState(false);

  return (
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
            {toggleFav ? (
              <IoHeart className="text-red-500" />
            ) : (
              <IoMdHeartEmpty />
            )}
          </button>
          <button className="p-1 bg-white rounded-full">
            <IoEyeOutline />
          </button>
        </div>
        <img
          src={image}
          alt={title}
          className="w-20 my-auto duration-200 group-hover:w-[75px]"
        />
      </div>
      <div className="flex flex-col gap-1 mx-3">
        <p className="font-semibold font-primary text-start">{title}</p>
        <div className="flex gap-1 ">
          <img src={categorylogo} className="w-4 h-4" alt="categorylogo" />
          <p className="text-sm font-primary text-slate-500">{categorytitle}</p>
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
  );
};

export default Card;

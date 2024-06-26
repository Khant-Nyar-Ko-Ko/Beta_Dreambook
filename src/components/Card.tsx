import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline, IoHeart } from "react-icons/io5";
import authorprofile from "../assets/images/Author.png";
import { NavLink } from "react-router-dom";
import { useAddFavourite } from "@/hooks/useFavouriteApi";

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
  const {mutate : addFavourite} = useAddFavourite();

  const handleAddFav = () => {
    setToggleFav(!toggleFav)
    addFavourite(id)
  };

  return (
    <div
      key={id}
      className=" flex flex-col w-[230px] gap-5 h-[260px] pb-3 bg-white border border-slate-100 rounded"
    >
      <div className="relative flex justify-center px-10 py-3 mx-3 mt-3 overflow-hidden bg-slate-200 group">
        <div className="absolute flex flex-col gap-3 duration-200 transform translate-x-10 group-hover:translate-x-0 right-3 top-10">
          <button
            onClick={handleAddFav}
            className="p-1 bg-white rounded-full"
          >
            {toggleFav ? (
              <IoHeart className="text-red-500" />
            ) : (
              <IoMdHeartEmpty />
            )}
          </button>
          <NavLink to={`/readbook/${id}`}>
            <button className="p-1 bg-white rounded-full">
              <IoEyeOutline />
            </button>
          </NavLink>
        </div>
        <img
          src={image}
          alt={title}
          className="my-2 duration-200 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 mx-3">
        <p className="font-semibold w-[230px] font-primary text-start">
          {title}
        </p>
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

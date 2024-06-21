import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline, IoHeart } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import profile from "../assets/images/Author.png";
import { NavLink } from "react-router-dom";
import { useFavouriteBooks } from "@/contexts/FavouriteBooksContext";

interface CardProps {
  id: number;
  title: string;
  image: string;
  categorylogo: string;
  categorytitle: string;
  author: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorprofile: any
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  image,
  categorylogo,
  categorytitle,
  author,
  authorprofile
}) => {
  const { favouriteBookIds, addFavouriteBook, removeFavouriteBook } =
    useFavouriteBooks();

  const handleAddFavouriteBook = (id: number) => {
    addFavouriteBook(id);
  };
  const handleRemoveFavouriteBook = (id: number) => {
    removeFavouriteBook(id);
  };

  return (
    <div
      key={id}
      className=" flex flex-col w-[230px] gap-5 h-[260px] pb-3 bg-white dark:bg-darkMode2 border border-slate-100 dark:border-darkMode1 rounded"
    >
      <div className="relative flex justify-center px-10 py-3 mx-3 mt-3 overflow-hidden bg-slate-200 dark:bg-darkMode3 group">
        <div className="absolute flex flex-col gap-3 duration-200 transform translate-x-10 group-hover:translate-x-0 right-3 top-5">
          {favouriteBookIds.includes(id) ? (
            <button
              onClick={() => handleRemoveFavouriteBook(id)}
              className="p-1 bg-white rounded-full"
            >
              <IoHeart className="text-red-500" />
            </button>
          ) : (
            <button
              onClick={() => handleAddFavouriteBook(id)}
              className="p-1 bg-white rounded-full"
            >
              <IoMdHeartEmpty />
            </button>
          )}

          <NavLink to={`/readbook/${id}`}>
            <button className="p-1 bg-white rounded-full">
              <IoEyeOutline />
            </button>
          </NavLink>
          <button className="p-1 bg-white rounded-full">
            <TiEdit />
          </button>
        </div>
        <img
          src={image}
          alt={title}
          className="my-2 duration-200 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 mx-3">
        <p className="font-semibold w-[230px] font-primary text-start  text-black dark:text-white">
          {title}
        </p>
        <div className="flex gap-1 ">
          <img src={categorylogo} className="w-4 h-4" alt="categorylogo" />
          <p className="text-sm font-primary text-slate-500 dark:text-white">{categorytitle}</p>
        </div>
        <div className="flex items-center gap-2 ">
          <img
            src={authorprofile === null ? profile : authorprofile}
            className="w-6 h-6 rounded-full "
            alt="author"
          />
          <p className="text-sm text-black font-primary dark:text-white">By {author === null ? "Unknown User" : author}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

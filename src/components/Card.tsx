import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline, IoHeart } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import profile from "../assets/images/Author.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useFavouriteBooks } from "@/contexts/FavouriteBooksContext";
import { getToken } from "@/service/authService";
import toast from "react-hot-toast";
import emptybook from "../assets/images/Empty Book.jpg";
import { useUserApi } from "@/hooks/useUserApi";
import { RiUserHeartLine } from "react-icons/ri";
import { GrChapterAdd } from "react-icons/gr";

interface CardProps {
  id: number;
  title: string;
  image: string;
  categorylogo: string;
  categorytitle: string;
  author: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorprofile: any;
  slug: string;
  authorId: number;
  favouriteCount?: number;
  chapterNum? : number
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  image,
  categorylogo,
  categorytitle,
  author,
  authorprofile,
  slug,
  authorId,
  favouriteCount,
  chapterNum
}) => {
  const token = getToken();
  const { favouriteBookIds, addFavouriteBook, removeFavouriteBook } =
    useFavouriteBooks();
  const { data: user } = useUserApi(token ?? "");
  const navigate = useNavigate();

  const handleAddFavouriteBook = (id: number) => {
    if (token) {
      addFavouriteBook(id);
      toast.success("Added to favourites");
    } else {
      navigate("/auth/login");
    }
  };
  
  const handleRemoveFavouriteBook = (id: number) => {
    if (token) {
      removeFavouriteBook(id);
      toast.success("Removed from favourites");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div
      key={id}
      className="flex flex-col w-[230px] gap-5 h-[260px] pb-3 bg-white dark:bg-darkMode2 border my-2 duration-300 hover:border-lighter border-slate-200 dark:border-darkMode1 rounded transform hover:scale-105"
    >
      <div className="relative flex justify-center px-10 h-[150px] py-3 mx-3 mt-3 overflow-hidden bg-slate-200 dark:bg-darkMode3 group">
        <div className="absolute flex flex-col gap-3 duration-200 transform translate-x-10 group-hover:translate-x-0 right-3 top-5">
          {favouriteBookIds.includes(id) ? (
            <button
              onClick={() => handleRemoveFavouriteBook(id)}
              className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white"
            >
              <IoHeart className="text-red-500" />
            </button>
          ) : (
            <button
              onClick={() => handleAddFavouriteBook(id)}
              className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white"
            >
              <IoMdHeartEmpty />
            </button>
          )}
          {token && slug ? (
            <NavLink to={`/readbook/${slug}`}>
              <button className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white">
                <IoEyeOutline />
              </button>
            </NavLink>
          ) : (
            <NavLink to={`/auth/login`}>
              <button className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white">
                <IoEyeOutline />
              </button>
            </NavLink>
          )}
          {user?.id === authorId && (
            <NavLink to={`/bookdetail/${slug}`}>
              <button className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white">
                <TiEdit />
              </button>
            </NavLink>
          )}
        </div>
        <img
          src={image ? image : emptybook}
          alt={title}
          className="my-2 duration-200 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 mx-3">
        <p className="font-semibold w-[230px] font-primary text-start  text-black dark:text-white">
          {title?.substring(0, 25)}
        </p>
        <div className="flex gap-1 ">
          <img src={categorylogo} className="w-4 h-4" alt="categorylogo" />
          <p className="text-sm font-primary text-slate-500 dark:text-white">
            {categorytitle}
          </p>
        </div>
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <img
            src={authorprofile === null ? profile : authorprofile}
            className="w-6 h-6 rounded-full "
            alt="author"
          />
          <p className="text-sm text-black font-primary dark:text-white">
            By {author === null ? "Unknown User" : author}
          </p>
        </div>
        <div className="flex items-center gap-2 ">
        <div className="flex items-center gap-1">
          <RiUserHeartLine className="text-red-500"/>
          <p className="text-sm text-black font-primary dark:text-white">{favouriteCount ? favouriteCount : 0}</p>
        </div>
        <div className="flex items-center gap-1">
          <GrChapterAdd className="text-default"/>
          <p className="text-sm text-black font-primary dark:text-white">{chapterNum ? chapterNum : 0}</p>
        </div>
        </div>
    </div>
      </div>
    </div>
  );
};

export default Card;

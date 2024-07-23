import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline, IoHeart } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import profile from "../../assets/images/Author.png";
import { NavLink } from "react-router-dom";
import { useFavouriteBooks } from "@/contexts/FavouriteBooksContext";
import { getToken } from "@/service/authService";
import toast from "react-hot-toast";
import { RiUserHeartLine } from "react-icons/ri";
import { GrChapterAdd } from "react-icons/gr";
import emptybook from "../../assets/images/Empty Book.jpg";


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
    status?: boolean;
    favouriteCount?: number;
    chapterNum?: number
  }

const CardUser: React.FC<CardProps> = ({
    id,
    title,
    image,
    categorylogo,
    categorytitle,
    author,
    authorprofile,
    slug,
    status,
    favouriteCount,
    chapterNum
  }) => {
    const { favouriteBookIds, addFavouriteBook, removeFavouriteBook } =
    useFavouriteBooks();

  const handleAddFavouriteBook = (id: number) => {
    addFavouriteBook(id);
    toast.success("Added to favourites");
  };
  const handleRemoveFavouriteBook = (id: number) => {
    removeFavouriteBook(id);
    toast.success("Removed from favourites")
  };
  const token = getToken();
  // console.log(slug);
  return (
    <div
    key={id}
    className=" flex flex-col w-[230px] gap-5 h-[260px] pb-3 bg-white dark:bg-darkMode2 border border-slate-100 dark:border-darkMode1 rounded"
  >
    <div className="relative flex justify-center px-10 py-3 mx-3 mt-3 overflow-hidden bg-slate-200 dark:bg-darkMode3 group">
      <div className="absolute flex flex-col gap-3 duration-200 transform translate-x-10 group-hover:translate-x-0 right-3 top-8">
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
        <NavLink to={`/bookdetail/${slug}`}>
        <button className="p-1 text-black bg-white rounded-full dark:bg-darkMode2 dark:text-white">

          <TiEdit />
        </button>
        </NavLink>
      </div>
      {status ? 
        <span className="absolute inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-green-800 rounded-full font-primary top-1 right-1 ring-1 ring-inset ring-green-600/20">publish</span>
        : 
        <span className="absolute inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-yellow-600 rounded-full font-primary top-1 right-1 ring-1 ring-inset ring-yellow-600/20">draft</span>
    }
      <img
        src={image || emptybook}
        alt={title + title}
        className="my-2 duration-200 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col gap-1 mx-3">
      <p className="font-semibold w-[230px] font-primary text-start  text-black dark:text-white">
        {title.substring(0, 25)}
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
  )
}

export default CardUser
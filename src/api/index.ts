import { signUpUser, signInUser, updateUser } from "./authApi";
import { fetchCategories } from "./categoryApi";
import { fetchBooks, fetchPaginatedBooks, createBooks, fetchSingleBook, fetchPopularBook } from "./bookApi";
import { addFavourite, fetchFavourite, removeFavourite } from "../api/favouriteApi";
import { selectCategory } from "../api/selectCategoryApi";
import { postComment } from "./commentApi";
import {getChapter} from "./chapterApi";

export {
  signUpUser,
  signInUser,
  updateUser,
  fetchCategories,
  fetchBooks,
  fetchSingleBook,
  fetchPaginatedBooks,
  createBooks,
  addFavourite,
  fetchFavourite,
  selectCategory,
  postComment,
  removeFavourite,
  fetchPopularBook,
  getChapter
};

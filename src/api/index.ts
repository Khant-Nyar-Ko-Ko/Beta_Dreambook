import { signUpUser, signInUser, updateUser } from "./authApi";
import { fetchCategories, fetchTrendingCategories } from "./categoryApi";
import {
  fetchBooks,
  createBooks,
  fetchSingleBook,
  fetchPopularBook,
  fetchBooksByLoginUser,
  fetchRelatedBooks
} from "./bookApi";
import {
  addFavourite,
  fetchFavourite,
  removeFavourite,
} from "../api/favouriteApi";
import { selectCategory } from "../api/selectCategoryApi";
import { postComment, getComment } from "./commentApi";
import { getChapter } from "./chapterApi";

export {
  signUpUser,
  signInUser,
  updateUser,
  fetchCategories,
  fetchBooks,
  fetchSingleBook,
  createBooks,
  addFavourite,
  fetchFavourite,
  selectCategory,
  postComment,
  removeFavourite,
  fetchPopularBook,
  getChapter,
  getComment,
  fetchTrendingCategories,
  fetchBooksByLoginUser,
  fetchRelatedBooks
};

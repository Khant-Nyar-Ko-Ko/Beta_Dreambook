import { signUpUser, signInUser, updateUser } from "./authApi";
import { fetchCategories } from "./categoryApi";
import { fetchBooks, fetchPaginatedBooks, createBooks } from "./bookApi";
import { addFavourite, fetchFavourite } from "../api/favouriteApi";
import { selectCategory } from "../api/selectCategoryApi";
import { postComment } from "../api/ commentApi";

export {
  signUpUser,
  signInUser,
  updateUser,
  fetchCategories,
  fetchBooks,
  fetchPaginatedBooks,
  createBooks,
  addFavourite,
  fetchFavourite,
  selectCategory,
  postComment,
};

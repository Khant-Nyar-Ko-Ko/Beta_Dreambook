import { fetchHistory, createHistory } from "./historyApi";
import { postChapterProgress, getChapterProgress } from "./chapterProgressApi";
import { signUpUser, signInUser, updateUser } from "./authApi";
import { fetchCategories, fetchTrendingCategories } from "./categoryApi";
import {
  fetchBooks,
  createBooks,
  fetchSingleBook,
  fetchPopularBook,
  fetchBooksByLoginUser,
  fetchRelatedBooks,
  updateBook,
  deleteBook,
} from "./bookApi";
import {
  addFavourite,
  fetchFavourite,
  removeFavourite,
} from "../api/favouriteApi";
import { selectCategory } from "../api/selectCategoryApi";
import {
  postComment,
  getComment,
  replyComment,
  getReply,
  countReply,
  deleteComment,
} from "./commentApi";
import {
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
} from "./chapterApi";

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
  fetchRelatedBooks,
  postChapterProgress,
  getChapterProgress,
  updateBook,
  createChapter,
  updateChapter,
  fetchHistory,
  createHistory,
  replyComment,
  getReply,
  countReply,
  deleteBook,
  deleteChapter,
  deleteComment,
};

import { Navigate, RouteObject } from "react-router-dom";
import BookLists from "@/components/personalinfo/BookLists";
import ChangePassword from "@/components/personalinfo/ChangePassword";
import FavBooks from "@/components/personalinfo/FavBooks";
import History from "@/components/personalinfo/History";
import PersonalInformation from "@/components/personalinfo/PersonalInformation";
import UserLayout from "@/layouts/UserLayout";
import BookDetailPage from "@/pages/user/BookDetailPage";
import ChildBookDetail from "@/components/ChildBookdetail";
import BookCraftingPage from "@/pages/user/BookCraftingPage";
import HomePage from "@/pages/user/HomePage";
import LibraryPage from "@/pages/user/LibraryPage";
import PersonalInfoPage from "@/pages/user/PersonalInfoPage";
import Chapters from "@/components/Chapters";
import Comment from "@/components/Comment";
import ReadBookPage from "@/pages/user/ReadBookPage";
import ReadChapterPage from "@/pages/user/ReadChapterPage";
import { ChapterProvider } from "@/contexts/ChapterContext";
import { LibraryProvider } from "@/contexts/LibraryContext";
import { PersonalInfoProvider } from "@/contexts/PersonalInfoContext";

const UserRouter: RouteObject[] = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "library/:categoryId?",
        element: (
          <LibraryProvider>
            <LibraryPage />
          </LibraryProvider>
        ),
      },
      {
        path: "bookcrafting",
        element: <BookCraftingPage />,
      },
      {
        path: "readbook/:slug",
        element: <ReadBookPage />,
      },
      {
        path: "readchapter/:slug/:chapterNum",
        element: (
          <ChapterProvider>
            <ReadChapterPage />
          </ChapterProvider>
        ),
      },
      {
        path: "bookdetail/:slug",
        element: <BookDetailPage />,
        children: [
          {
            index: true,
            element: <Navigate to="childBookdetail" replace />,
          },
          {
            path: "childBookdetail",
            element: <ChildBookDetail />,
          },
          {
            path: "chapters",
            element: <Chapters />,
          },
          {
            path: "comment",
            element: <Comment />,
          },
        ],
      },
      {
        path: "personalinfo",
        element: <PersonalInfoPage />,
        children: [
          {
            index: true,
            element: <Navigate to="info" replace />,
          },
          {
            path: "info",

            element: <PersonalInformation />,
          },
          {
            path: "book-lists",
            element: (
              <PersonalInfoProvider>
                <BookLists />
              </PersonalInfoProvider>
            ),
          },
          {
            path: "fav-books",
            element: <FavBooks />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "change-pw",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
];

export default UserRouter;

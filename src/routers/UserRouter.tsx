import BookLists from "@/components/personalinfo/BookLists";
import ChangePassword from "@/components/personalinfo/ChangePassword";
import FavBooks from "@/components/personalinfo/FavBooks";
import History from "@/components/personalinfo/History";
import PersonalInformation from "@/components/personalinfo/PersonalInformation";
import UserLayout from "@/layouts/UserLayout";
import BookCraftingPage from "@/pages/user/BookCraftingPage";
import HomePage from "@/pages/user/HomePage";
import LibraryPage from "@/pages/user/LibraryPage";
import PersonalInfoPage from "@/pages/user/PersonalInfoPage";
import { Navigate, RouteObject } from "react-router-dom";

const UserRouter: RouteObject[] = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"home"} />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "library",
        element: <LibraryPage />,
      },
      {
        path: "bookcrafting",
        element: <BookCraftingPage />,
      },
      {
        path: "personalinfo",
        element: <PersonalInfoPage/>,
        children : [
          {
            index: true,
            element: <Navigate to={"info"} />,
          },
          {
            path: "info",
            element: <PersonalInformation/>
          },
          {
            path: "book-lists",
            element: <BookLists/>
          },
          {
            path: "fav-books",
            element: <FavBooks/>
          },
          {
            path: "history",
            element: <History/>
          },
          {
            path: "change-pw",
            element: <ChangePassword/>
          },

        ]
      }
    ],
  },
];

export default UserRouter;

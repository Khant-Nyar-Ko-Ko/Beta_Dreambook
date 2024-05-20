import UserLayout from "@/layouts/UserLayout";
import BookCraftingPage from "@/pages/BookCraftingPage";
import HomePage from "@/pages/HomePage";
import LibraryPage from "@/pages/LibraryPage";
import { Navigate, RouteObject } from "react-router-dom";

const UserRouter : RouteObject[] = [
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {
                index: true,
                element : <Navigate to={'/home'}/>
            },
            {
                path: 'home',
                element: <HomePage/>
            },
            {
                path: 'library',
                element: <LibraryPage/>
            },{
                path: 'bookcrafting',
                element: <BookCraftingPage/>
            }
        ]
    }
]

export default UserRouter;
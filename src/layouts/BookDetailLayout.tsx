import BookDetailSideBar from "@/components/BookDetailSideBar";
import { Outlet } from "react-router-dom";

const BookDetailLayout = () => {
  return (
    <div className="flex w-screen">
      <BookDetailSideBar />
      <Outlet />
    </div>
  );
};

export default BookDetailLayout;

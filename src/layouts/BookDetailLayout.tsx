import BookDetailSideBar from "@/components/BookDetailSideBar";
import { Outlet } from "react-router-dom";

const BookDetailLayout = () => {
  return (
    <div className="flex">
      <BookDetailSideBar />
      <Outlet />
    </div>
  );
};

export default BookDetailLayout;

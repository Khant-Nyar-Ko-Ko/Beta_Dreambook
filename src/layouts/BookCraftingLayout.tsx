import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const BookCraftingLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default BookCraftingLayout;

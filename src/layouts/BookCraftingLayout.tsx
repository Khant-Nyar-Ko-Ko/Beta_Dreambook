import Navbar from "@/components/tools/Navbar";
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

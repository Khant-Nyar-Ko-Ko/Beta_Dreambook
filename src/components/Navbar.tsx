import logo from "../assets/images/Logo.svg";
import { IoPersonCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="w-screen h-[80px] flex justify-between items-center px-[120px] bg-white shadow">
      <img src={logo} className=" w-[75px] h-[61px]" alt="" />
      <div className="flex gap-2  w-[375px] h-[40px] items-center">
        <Button variant="menu">Home</Button>
        <Button variant="menu">Library</Button>
        <Button variant="menu">Book crafting</Button>
      </div>
      <div className="flex gap-[10px] items-center">
        <Button variant="white">
          <IoPersonCircle className="w-6 h-6 rounded" />
          Login
        </Button>
        <Button variant="white">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Navbar;

import logo from "../assets/images/Logo.svg";
import { IoPersonCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="w-screen h-[80px] flex justify-between items-center px-[120px] bg-white shadow">
      <img src={logo} className=" w-[75px] h-[61px]" alt="" />
      <div className="flex gap-2  w-[375px] h-[40px]">
        <Button className=" text-black hover:text-white bg-transparent hover:bg-[#3A7AD5] px-4 py-1 rounded-full duration-100">Home</Button>
        <Button className=" text-black hover:text-white bg-transparent hover:bg-[#3A7AD5] px-4 py-1 rounded-full duration-100">Library</Button>
        <Button className=" text-black hover:text-white bg-transparent hover:bg-[#3A7AD5] px-4 py-1 rounded-full duration-100">Book crafting</Button>
      </div>
      <div className="flex gap-[10px] items-center">
        <Button className=" flex gap-2 text-[#3A7AD5] hover:text-white hover:bg-[#3A7AD5] px-4 py-2 rounded-full duration-100">
          <IoPersonCircle className="w-6 h-6 rounded" />
          Login
        </Button>
        <Button className="text-[#3A7AD5] hover:text-white hover:bg-[#3A7AD5] px-4 py-2 rounded-full duration-100">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Navbar;

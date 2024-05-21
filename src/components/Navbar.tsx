import logo from "../assets/images/Logo.svg";
import { IoPersonCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-screen h-[80px] flex justify-between items-center px-[120px] bg-white shadow">
      <NavLink to={"/"}>
        <img src={logo} className="w-20 h-16 " alt="" />
      </NavLink>
      <div className="flex gap-2  w-[375px] h-[40px] items-center">
        <Button variant="menu">Home</Button>
        <Button variant="menu">Library</Button>
        <Button variant="menu">Book crafting</Button>
      </div>
      <div className="flex gap-[10px] items-center">
        <NavLink to={"/auth/login"}>
          <Button variant="white">
            <IoPersonCircle className="w-6 h-6 rounded" />
            Login
          </Button>
        </NavLink>
        <NavLink to={"/auth/register"}>
          <Button variant="white">Register</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

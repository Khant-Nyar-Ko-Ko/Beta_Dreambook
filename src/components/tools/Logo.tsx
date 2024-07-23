import { NavLink } from "react-router-dom";
import logo from "../../assets/images/Login/Vector 2.svg";

const Logo = () => {
  return (
    <div className=" mb-7">
      <NavLink to="/home">
        <div className="flex gap-4 w-[300px] md:w-[370px] justify-center items-center">
          <img src={logo} className="w-16 h-16 md:w-20 " alt="" />
          <div className=" w-[300px] md:w-[350px] flex flex-col gap-1">
            <h3 className="text-xl font-bold text-white font-primary">
              Dream Book
            </h3>
            <p className=" text-[10px] md:text-sm text-white font-primary">
              Book Reading & Publishing Platform
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Logo;

import { Button } from "@/components/ui/button";
import background from "../assets/images/AuthBgImage.avif";
import logo from "../assets/images/Login/Vector 2.svg";
import { NavLink } from "react-router-dom";
import Categories from "@/components/Categories";

const SelectCategoryPage = () => {
  return (
    <div className="relative w-screen h-screen">
      {/* background */}
      <img
        src={background}
        className="absolute top-0 left-0 object-cover w-full h-full"
        alt="Background"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-background opacity-80"></div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full ">
        <div className="flex flex-col items-center gap-5">
          {/* logo */}
          <div className="flex gap-4 w-[370px]">
            <img src={logo} className="w-20 h-16 " alt="" />
            <div className="w-[350px] flex flex-col gap-1">
              <h3 className="text-xl font-bold text-white font-primary">
                Dream Book
              </h3>
              <p className="text-sm text-white font-primary">
                Book Reading & Publishing Platform
              </p>
            </div>
          </div>
          <h2 className="text-xl text-white font-primary">
            Select Your Interested Category
          </h2>
          <div className="flex flex-col text-center gap-7">
            <div className="grid grid-cols-2 gap-5 ">
              <Categories />
            </div>
            <NavLink to={"/library"}>
              <Button className="w-full ">Finish</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategoryPage;

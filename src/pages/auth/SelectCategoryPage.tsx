import { Button } from "@/components/ui/button";
import background from "../../assets/images/AuthBgImage.avif";
import { NavLink } from "react-router-dom";
import Categories from "@/components/Categories";
import Logo from "@/components/Logo";
import { useSelectCategory } from "@/hooks/useSelectCategoryApi";

const SelectCategoryPage = () => {
  const {data} = useSelectCategory();
  console.log(data);
  
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
        <div className="flex flex-col items-center gap-2 md:gap-5">
          {/* logo */}
          <Logo />
          <h2 className="text-white md:text-xl font-primary">
            Select Your Interested Category
          </h2>
          <div className="flex flex-col text-center gap-7">
            <div className="grid gap-5 md:grid-cols-2 ">
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

import Logo from "@/components/tools/Logo";
import background from "../../assets/images/AuthBgImage.avif";
import Categories from "@/components/additional/Categories";

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
        <div className="flex flex-col items-center gap-2 md:gap-5">
          {/* logo */}
          <Logo />
          <h2 className="text-white md:text-xl font-primary">
            Select Your Interested Category
          </h2>
          <div className="flex flex-col text-center gap-7">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategoryPage;

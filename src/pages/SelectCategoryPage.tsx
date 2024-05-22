import { Button } from "@/components/ui/button";
import background from "../assets/images/AuthBgImage.avif";
import logo from "../assets/images/Login/Vector 2.svg";
import digitalmarket from "../assets/images/categories/digitalmarket.png";
import personaldev from "../assets/images/categories/personaldev.png";
import technology from "../assets/images/categories/tech.png";
import timemanagement from "../assets/images/categories/timemanage.png";
import health from "../assets/images/categories/health.png";
import contentmarketing from "../assets/images/categories/content.png";
import selfmanagement from "../assets/images/categories/selfmanage.png";
import success from "../assets/images/categories/success.png";
import productivity from "../assets/images/categories/productivity.png";
import bussiness from "../assets/images/categories/bussiness.png";
import { NavLink } from "react-router-dom";


const categories = [
  {
    id: 1,
    title: "Digital Marketing",
    image : digitalmarket
  },
  {
    id: 2,
    title: "Personal Development",
    image : personaldev
  },
  {
    id: 3,
    title: "Technology",
    image : technology
  },
  {
    id: 4,
    title: "Time Management",
    image : timemanagement
  },
  {
    id: 5,
    title: "Health",
    image : health
  },
  {
    id: 6,
    title: "Content Marketing",
    image : contentmarketing
  },
  {
    id: 7,
    title: "Self-Management",
    image : selfmanagement
  },
  {
    id: 8,
    title: "Success",
    image : success
  },
  {
    id: 9,
    title: "Productivity",
    image : productivity
  },
  {
    id: 10,
    title: "Bussiness",
    image : bussiness
  },
];

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
              {categories.map((item) => (
                <div key={item.id} className="flex items-center gap-2 px-4 py-1 bg-white rounded ">
                  <input type="checkbox" />
                  <img className="w-10 h-10" src={item.image} alt="" />
                  <p className="text-sm ">{item.title}</p>
                </div>
              ))}
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

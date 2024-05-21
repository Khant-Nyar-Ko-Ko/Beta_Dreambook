import { Input } from "@/components/ui/input";
import background from "../assets/images/AuthBgImage.avif";
import logo from "../assets/images/Login/Vector 2.svg";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
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
        <div className="flex flex-col items-center gap-9">
          {/* logo */}
          <div className="flex gap-4 w-[370px]">
            <img src={logo} className="w-20 h-16 " alt="" />
            <div className="w-[350px] gap-2">
              <h3 className="text-2xl font-bold text-white font-primary">
                Dream Book
              </h3>
              <p className="text-sm text-white font-primary">
                Book Reading & Publishing Platform
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl text-white font-primary">
              Create an account
            </h2>
            <p className="text-white font-primary">
              Get started to share books & reading
            </p>
          </div>
          <div className="flex flex-col text-center gap-9">
            <div className="flex flex-col gap-8 ">
              <Input inputType="email" placeholder="Email" />
              <Input inputType="password" placeholder="Password" />
              <Input inputType="password" placeholder="Confirm Password" />
            </div>
            <NavLink to={"/auth/userinfo"}>
              <Button className="w-full ">Create an account</Button>
            </NavLink>
            <div className="flex items-center justify-center font-primary">
              <p className="text-white "> Already have an account?</p>
              <NavLink to={"/auth/register"}>
                <Button
                  variant="ghost"
                  className="text-base font-semibold cursor-pointer "
                >
                  Login
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

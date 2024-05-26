import { Input } from "@/components/ui/input";
import background from "../assets/images/AuthBgImage.avif";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { IoPerson } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
        <div className="flex flex-col items-center justify-center gap-7 md:gap-9">
          {/* logo */}
          <Logo />
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-3xl text-white font-primary">Welcome again!</h2>
            <p className="text-white font-primary">
              Please login to your account
            </p>
          </div>
          <div className="flex flex-col text-center gap-7">
            <div className="flex flex-col items-center gap-8 ">
              <div className="relative ">
                <Input placeholder="Username" />
                <IoPerson color="slate" className="absolute right-5 top-3" />
              </div>
              <div className="relative">
                <Input
                  inputType={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-5 top-3 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash color="slate" />
                  ) : (
                    <FaEye color="slate" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-center ">
              <NavLink to={"/"}>
                <Button className=" w-[300px] md:w-[350px]">Log in</Button>
              </NavLink>
            </div>
            <div className="flex items-center justify-center font-primary">
              <p className="text-sm text-white  md:text-base">
                Don't have an account?
              </p>
              <NavLink to={"/auth/register"}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-sm font-semibold cursor-pointer md:text-base"
                >
                  Create an acccount
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

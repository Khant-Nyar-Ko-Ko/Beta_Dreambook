import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../ui/input";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="flex flex-col items-center justify-center w-4/5 h-full text-center gap-9">
      <div className="flex flex-col gap-2 px-4 py-8 text-center md:px-0">
        <h2 className="text-base md:text-2xl font-primary">Change Your Password</h2>
        <p className=" text-xs md:text-sm w-[300px] opacity-50 font-primary">
          The new password you set must be different the previous one
        </p>
      </div>
      <div className="flex flex-col gap-8 ">
        <div className="relative">
          <Input
            className=" w-[200px] md:w-[350px]"
            inputType={showPassword ? "text" : "password"}
            placeholder="Enter Old Password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showPassword ? (
              <FaEye color="slate" />
            ) : (
              <FaEyeSlash color="slate" />
            )}
          </button>
        </div>
        <div className="relative">
          <Input
           className=" w-[200px] md:w-[350px]"
            inputType={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showPassword ? (
              <FaEye color="slate" />
            ) : (
              <FaEyeSlash color="slate" />
            )}
          </button>
        </div>
        <div className="relative">
          <Input
            className=" w-[200px] md:w-[350px]"
            inputType={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showPassword ? (
              <FaEye color="slate" />
            ) : (
              <FaEyeSlash color="slate" />
            )}
          </button>
        </div>
      </div>
      <NavLink to={"/"}>
        <Button className=" w-[200px] md:w-[350px] ">Change Password</Button>
      </NavLink>
    </div>
  );
};

export default ChangePassword;

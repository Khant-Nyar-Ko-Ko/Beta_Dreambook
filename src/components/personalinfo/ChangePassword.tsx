import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../ui/input";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";

const ChangePassword = () => {
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setOldShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setNewShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword((prevShowPassword) => !prevShowPassword);
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
            inputType={showOldPassword ? "text" : "password"}
            placeholder="Enter Old Password"
          />
          <button
            type="button"
            onClick={toggleOldPasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showOldPassword ? (
              <FaEyeSlash color="slate" />
            ) : (
              <FaEye color="slate" />
            )}
          </button>
        </div>
        <div className="relative">
          <Input
           className=" w-[200px] md:w-[350px]"
            inputType={showNewPassword ? "text" : "password"}
            placeholder="Enter New Password"
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showNewPassword ? (
              <FaEyeSlash color="slate" />
            ) : (
              <FaEye color="slate" />
            )}
          </button>
        </div>
        <div className="relative">
          <Input
            className=" w-[200px] md:w-[350px]"
            inputType={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showConfirmPassword ? (
              <FaEyeSlash color="slate" />
            ) : (
              <FaEye color="slate" />
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

import { Input } from "@/components/ui/input";
import background from "../assets/images/AuthBgImage.avif";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";

const LoginPage = () => {
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
          <Logo/>
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-3xl text-white font-primary">Welcome again!</h2>
            <p className="text-white font-primary">
              Please login to your account
            </p>
          </div>
          <div className="flex flex-col text-center gap-7">
            <div className="flex flex-col gap-8 ">
              <Input placeholder="Username" />
              <Input inputType="password" placeholder="Password" />
            </div>
            <NavLink to={"/"}>
              <Button className="w-full">Log in</Button>
            </NavLink>
            <div className="flex items-center justify-center font-primary">
              <p className="text-white ">Don't have an account?</p>
              <NavLink to={"/auth/register"}>
                <Button
                  variant="ghost"
                  className="text-base font-semibold cursor-pointer "
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

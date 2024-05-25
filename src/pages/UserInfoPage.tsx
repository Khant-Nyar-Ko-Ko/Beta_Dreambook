import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import background from "../assets/images/AuthBgImage.avif";
import { Textarea } from "@/components/ui/textarea";
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { LuPhone } from "react-icons/lu";

const UserInfoPage = () => {
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
        <div className="flex flex-col items-center gap-4">
          {/* logo */}
          <Logo />

          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-xl text-white font-primary">
              Create an account
            </h2>
          </div>
          <div className="flex flex-col text-center gap-7">
            <div className="flex flex-col gap-5 ">
              <div className="flex items-center justify-center gap-4">
                <Input
                  type="file"
                  className="w-24 h-24 rounded-full bg-slate-200"
                />
                <p className="text-white font-primary">Upload Photo</p>
              </div>
              <div className="flex gap-3 ">
                <Input type="number" className="w-20" placeholder="+95" />
                <div className="relative w-full ">
                  <Input type="number" className="w-full" placeholder="Phone" />
                  <LuPhone color="slate" className="absolute right-5 top-3" />
                </div>
              </div>
              <Input placeholder="Full name" />
              <Input placeholder="Gender" />
              <Textarea placeholder="Bio" className=" placeholder:text-slate-500" />
            </div>
            <NavLink to={"/auth/selectcategory"}>
              <Button className="w-full ">Create an account</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;

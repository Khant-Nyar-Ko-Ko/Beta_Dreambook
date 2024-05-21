import { Input } from "@/components/ui/input";
import background from "../assets/images/AuthBgImage.avif";
import logo from "../assets/images/Login/Vector 2.svg";
import { Button } from "@/components/ui/button";

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
        <div className=" mb-7">
        <div className="flex gap-4 w-[370px]">
          <img src={logo} className="w-20 h-16 " alt="" />
          <div className="w-[350px] flex flex-col gap-1">
            <h3 className="text-xl font-bold text-white font-primary">Dream Book</h3>
            <p className="text-sm text-white font-primary">
              Book Reading & Publishing Platform
            </p>
          </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-3xl text-white font-primary">Welcome again!</h2>
          <p className="text-white font-primary">Please login to your account</p>
        </div>
        <div className="flex flex-col text-center gap-7">
          <div className="flex flex-col gap-8 ">
            <Input placeholder="Username"/>
            <Input inputType="password" placeholder="Password" />
          </div>
          <Button>Log in</Button>
          <p className="text-white font-primary">
            Don't have an account? 
            <span className="font-semibold font-primary"> Create an acccount</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LoginPage
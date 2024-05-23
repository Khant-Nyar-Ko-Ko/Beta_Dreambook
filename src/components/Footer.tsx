import DownloadOnMobile from "./DownloadOnMobile";
import Logo from "./Logo";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className=" bg-default w-screen h-[400px] flex flex-col justify-center items-center">
      <Logo />
      <div className="flex gap-10">
        <div className="flex gap-5 mt-10 font-primary">
          <Button>Home</Button>
          <Button>Recommended Books</Button>
          <Button>Latest Books</Button>
          <Button>FAQs</Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-[10px] text-white uppercase font-primary">Try on mobile</p>
          <DownloadOnMobile />
        </div>
      </div>
      <div className="w-3/4 my-10 border border-white"></div>
       <p className="text-sm text-white  font-primary">Copyright 2024 dream book. All Rights reserved.</p>
    </div>
  );
};

export default Footer;

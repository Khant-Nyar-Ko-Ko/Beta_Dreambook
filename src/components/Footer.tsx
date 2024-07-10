import DownloadOnMobile from "./DownloadOnMobile";
import Logo from "./Logo";
import { Button } from "./ui/button";

type FooterProps = {
  onButtonClick: (id: string) => void;
};

const Footer: React.FC<FooterProps>  = ({ onButtonClick }) => {

  return (
    <div className="flex flex-col items-center justify-center w-screen h-auto py-10 select-none bg-default dark:bg-dark">
      <Logo />
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex flex-col items-start gap-2 mt-10 md:items-center md:gap-5 md:flex-row font-primary">
          <Button onClick={() => onButtonClick('home')}>Home</Button>
          <Button onClick={() => onButtonClick('popular-books')}>Popular Books</Button>
          <Button onClick={() => onButtonClick('latest-books')}>Latest Books</Button>
          <Button onClick={() => onButtonClick('faq')}>FAQs</Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-[10px] text-white uppercase font-primary">Try on mobile</p>
          <DownloadOnMobile />
        </div>
      </div>
      <div className="w-screen my-5 border border-white md:my-10 md:w-3/4"></div>
       <p className="text-sm text-white font-primary">Copyright 2024 dream book. All Rights reserved.</p>
    </div>
  );
};

export default Footer;

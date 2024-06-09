import applestore from "../assets/images/landing/App Store.png";
import playstore from "../assets/images/landing/Play Store.png";

const DownloadOnMobile = () => {
  return (
    <div className="flex gap-5">
      <img src={applestore} className="w-32 h-auto cursor-pointer md:w-40" alt="applestore" />
      <img src={playstore} className="w-32 h-auto cursor-pointer md:w-40" alt="applestore" />
    </div>
  );
};

export default DownloadOnMobile;

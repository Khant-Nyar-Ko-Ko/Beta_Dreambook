import { Link } from "react-router-dom";
import applestore from "../../assets/images/landing/App Store.png";
import playstore from "../../assets/images/landing/Play Store.png";
import { motion } from "framer-motion";


const DownloadOnMobile = () => {
  return (
    <div className="flex gap-5">
      <Link to="https://www.apple.com/app-store">
      <motion.img initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration:0.5, delay: 1}} src={applestore} className="w-32 h-auto cursor-pointer md:w-40" alt="applestore" />
      </Link>
      <Link to="https://play.google.com/store/apps?hl=en">
      <motion.img initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration:1, delay: 1}} src={playstore} className="w-32 h-auto cursor-pointer md:w-40" alt="googleplay" />
      </Link>
    </div>
  );
};

export default DownloadOnMobile;

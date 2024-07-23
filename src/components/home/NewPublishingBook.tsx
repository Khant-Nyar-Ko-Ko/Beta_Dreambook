import background from "../../assets/images/AuthBgImage.avif";
import newPublishingBook from "../../assets/images/NewPublishingBook.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const NewPublishingBook = () => {
  return (
    <div className="relative w-screen h-[450px] overflow-hidden">
      {/* background */}
      <img
        src={background}
        className="absolute top-0 left-0 object-cover w-full h-full"
        alt="Background"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-[450px] overflow-hidden bg-background dark:bg-darkMode2 opacity-80"></div>
      <div className="z-20 flex flex-col items-start md:justify-between w-screen h-full gap-5 mx-10 my-10 md:my-0 md:items-center md:mx-[140px] md:flex-row">
        <div className="z-10 flex flex-col items-start justify-center gap-8 md:w-1/2">
          <div className="flex flex-col gap-4">
            <motion.p
              initial={{ x: -300 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1 }}
              className="text-lg text-white md:text-xl font-primary"
            >
              Latest collections
            </motion.p>
            <motion.h2
              initial={{ x: -300 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.2 }}
              className="text-2xl font-semibold text-white md:text-5xl font-primary"
            >
              The New Publishing Books
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <NavLink to={"/library"}>
              <Button>Explore Now</Button>
            </NavLink>
          </motion.div>
        </div>
        <motion.div
          initial={{ x: 300 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
          className="z-10 flex flex-col items-center justify-center gap-5 md:w-1/2"
        >
          <img
            src={newPublishingBook}
            className=" w-[400px] pr-[120px]"
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
};

export default NewPublishingBook;

import { IoIosArrowForward } from "react-icons/io";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ViewMore = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <NavLink to={"/library"}>
        <Button
          variant="white"
          className="flex items-center gap-2 text-sm text-center text-black md:text-base dark:text-white hover:text-black hover:dark:text-white hover:bg-transparent"
        >
          View More <IoIosArrowForward />
        </Button>
      </NavLink>
    </motion.div>
  );
};

export default ViewMore;

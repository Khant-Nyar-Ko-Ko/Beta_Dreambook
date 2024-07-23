import aboutbg from "../../assets/images/aboutbg.avif";
import { motion } from "framer-motion";

const cardData = [
  {
    id: 1,
    heading: "About Us",
    subheading: "Our Story",
    desc: "Dedicated to spreading the love of literature.",
    duration: 2,
  },
  {
    id: 2,
    heading: "Featured",
    subheading: "Explore",
    desc: "Discover your favorite books from everywhere and at any time.",
    duration: 1.5,
  },
  {
    id: 3,
    heading: "Visit Now",
    subheading: "Browse",
    desc: "Experience the magic of books.",
    duration: 1,
  },
];

const About = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-3 px-10 py-10 md:px-[140px]">
      {cardData.map(({ id, heading, subheading, desc, duration }) => (
        <motion.div
          key={id}
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          whileHover={{ rotateY: 20, rotateX: 20}}
          transition={{ duration }}
          className="relative flex cursor-pointer flex-col w-full h-[150px] transform hover:rotate-1 hover:scale-105 duration-300 gap-5 px-5 pt-5 pb-10 rounded-lg md:w-auto"
        >
          <p className="z-20 text-white font-primary">{heading}</p>
          <div className="z-20 flex flex-col">
            <p className="text-[10px] text-white font-primary">{subheading}</p>
            <p className="text-[12px] text-white font-primary">{desc}</p>
          </div>
          <div className="absolute top-0 left-0 bg-default bg-opacity-80 rounded-lg w-full h-[150px] z-10"></div>
          <img
            src={aboutbg}
            className="absolute w-full h-[150px] rounded-lg top-0 left-0 z-0 overflow-hidden"
            alt=""
          />
        </motion.div>
      ))}
    </div>
  );
};

export default About;

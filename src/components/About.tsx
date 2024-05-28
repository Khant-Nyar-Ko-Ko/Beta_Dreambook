import aboutbg from "../assets/images/aboutbg.avif";

const cardData = [
  {
    id: 1,
    heading: "About Us",
    subheading: "Our Story",
    desc: "Dedicated to Spreding the love of Literature",
  },
  {
    id: 2,
    heading: "Feactured",
    subheading: "Explore",
    desc: " Discover Your Favorite Books from Everywhere and at anytime",
  },
  {
    id: 3,
    heading: "Visit Now",
    subheading: "Browse",
    desc: "Experience the Magic of Books",
  },
];

const About = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-3 px-10 py-10 md:px-[140px]">
      {cardData.map(({ id, heading, subheading, desc }) => (
        <div
          key={id}
          className="relative flex flex-col w-full h-[150px] gap-5 px-5 pt-5 pb-10 rounded-lg bg-opacity-80 bg-default md:w-auto"
        >
          <img
            src={aboutbg}
            className="absolute w-full rounded-lg h-[150px] top-0 left-0 z-[-1] overflow-hidden"
            alt=""
          />
          <p className="text-white font-primary">{heading}</p>
          <div className="flex flex-col">
            <p className="text-[10px] text-white font-primary">{subheading}</p>
            <p className="text-[12px] text-white font-primary">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;

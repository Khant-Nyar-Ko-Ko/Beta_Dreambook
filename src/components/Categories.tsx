import digitalmarket from "../assets/images/categories/digitalmarket.png";
import personaldev from "../assets/images/categories/personaldev.png";
import technology from "../assets/images/categories/tech.png";
import timemanagement from "../assets/images/categories/timemanage.png";
import health from "../assets/images/categories/health.png";
import contentmarketing from "../assets/images/categories/content.png";
import selfmanagement from "../assets/images/categories/selfmanage.png";
import success from "../assets/images/categories/success.png";
import productivity from "../assets/images/categories/productivity.png";
import bussiness from "../assets/images/categories/bussiness.png";

const categories = [
  {
    id: 1,
    title: "Digital Marketing",
    image: digitalmarket,
  },
  {
    id: 2,
    title: "Personal Development",
    image: personaldev,
  },
  {
    id: 3,
    title: "Technology",
    image: technology,
  },
  {
    id: 4,
    title: "Time Management",
    image: timemanagement,
  },
  {
    id: 5,
    title: "Health",
    image: health,
  },
  {
    id: 6,
    title: "Content Marketing",
    image: contentmarketing,
  },
  {
    id: 7,
    title: "Self-Management",
    image: selfmanagement,
  },
  {
    id: 8,
    title: "Success",
    image: success,
  },
  {
    id: 9,
    title: "Productivity",
    image: productivity,
  },
  {
    id: 10,
    title: "Bussiness",
    image: bussiness,
  },
];

const Categories = () => {
  return (
    <>
      {categories.map(({id, title, image}) => (
        <div
          key={id}
          className="flex items-center gap-2 px-2 py-1 bg-white rounded md:px-4 "
        >
          <input type="checkbox" />
          <img className="w-8 h-auto md:w-10 md:h-10" src={image} alt="" />
          <p className=" text-[10px] md:text-sm ">{title}</p>
        </div>
      ))}
    </>
  );
};

export default Categories;

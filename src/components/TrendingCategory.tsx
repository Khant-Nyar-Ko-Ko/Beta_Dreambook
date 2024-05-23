import digitalmarket from "../assets/images/categories/digitalmarket.png";
import personaldev from "../assets/images/categories/personaldev.png";
import timemanagement from "../assets/images/categories/timemanage.png";
import success from "../assets/images/categories/success.png";
import productivity from "../assets/images/categories/productivity.png";
import bussiness from "../assets/images/categories/bussiness.png";

const trendingCategories = [
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
      title: "Time Management",
      image: timemanagement,
    },
    {
      id: 4,
      title: "Success",
      image: success,
    },
    {
      id: 5,
      title: "Productivity",
      image: productivity,
    },
    {
      id: 6,
      title: "Bussiness",
      image: bussiness,
    },
  ];

const TrendingCategory = () => {
  return (
    <>
    {trendingCategories.map(({id, title, image}) => (
      <div
        key={id}
        className="flex items-center justify-start w-[300px] gap-5 px-4 py-2 bg-white border rounded"
      >
        <img className="w-10 h-10" src={image} alt="" />
        <p className="text-sm font-semibold ">{title}</p>
      </div>
    ))}
  </>
  )
}

export default TrendingCategory
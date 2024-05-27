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

import React, { useState } from "react";

type Option = {
  label: string;
  value: string;
  image: string;
};

const options: Option[] = [
  {
    label: "Digital Marketing",
    value: "Digital Marketing",
    image: digitalmarket,
  },
  {
    label: "Personal Development",
    value: "Personal Development",
    image: personaldev,
  },
  {
    label: "Technology",
    value: "Technology",
    image: technology,
  },
  {
    label: "Time Management",
    value: "Time Management",
    image: timemanagement,
  },
  {
    label: "Health",
    value: "Health",
    image: health,
  },
  {
    label: "Content Marketing",
    value: "Content Marketing",
    image: contentmarketing,
  },
  {
    label: "Self-Management",
    value: "Self-Management",
    image: selfmanagement,
  },
  {
    label: "Success",
    value: "Success",
    image: success,
  },
  {
    label: "Productivity",
    value: "Productivity",
    image: productivity,
  },
  {
    label: "Bussiness",
    value: "Bussiness",
    image: bussiness,
  },
];

const CustomDropdown: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    // <div className="relative inline-block w-full">
    //   <div className="relative">
    //     <select
    //       className={`w-full appearance-none bg-white border border-gray-300 rounded shadow p-2 pr-8 ${
    //         selectedValue ? "text-transparent" : "text-gray-700"
    //       }`}
    //       value={selectedValue}
    //       onChange={handleChange}
    //     >
    //       <option value="" disabled>
    //         Select an option
    //       </option>
    //       {options.map((option) => (
    //         <option key={option.value} value={option.value}>
    //           {option.label}
    //         </option>
    //       ))}
    //     </select>
    //     <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
    //       <svg
    //         className="w-4 h-4 fill-current"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 20 20"
    //       >
    //         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
    //       </svg>
    //     </div>
    //     {selectedOption && (
    //       <div className="absolute inset-y-0 left-0 flex items-center p-2 pointer-events-none">
    //         <img
    //           src={selectedOption.image}
    //           alt={selectedOption.label}
    //           className="w-6 h-6 mr-2"
    //         />
    //         <span className="text-gray-700">{selectedOption.label}</span>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="relative inline-block w-full">
      <select
        className="w-full p-2 bg-white border border-gray-300 rounded shadow"
        value={selectedValue || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="p-10 m-2">
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div className="flex items-center p-2 mt-2 border border-gray-300 rounded shadow bg-sky-100">
          <img
            src={selectedOption.image}
            alt={selectedOption.label}
            className="w-6 h-6 mr-2"
          />
          <span>{selectedOption.label}</span>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

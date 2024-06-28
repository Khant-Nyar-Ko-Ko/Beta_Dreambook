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
    <div className="relative inline-block w-full">
      <select
        className="w-full p-3 bg-white border border-gray-300 rounded"
        value={selectedValue || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          select category
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="p-10 m-2">
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div className="flex items-center p-3 mt-2 border border-gray-300 rounded shadow bg-sky-100">
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

import React, { useEffect, useState } from "react";
import { useFetchCategories } from "@/hooks/useCategoryApi";
interface CustomDropdownProps {
  categoryId?: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  categoryId,
  onChange,
  isDisabled,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>("");

  useEffect(() => {
    setSelectedValue(categoryId);
  }, [categoryId]);

  const { data: categories } = useFetchCategories();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value)
  };

  const selectedOption = categories?.find(
    (category) => category.id === selectedValue
  );

  useEffect(() => {
    console.log("Category ID:", categoryId); // Debugging line
  }, [categoryId]);

  return (
    <div className="relative inline-block w-full">
      <select
        className="w-full p-3 text-black bg-white border border-gray-300 rounded dark:text-white dark:bg-darkMode2"
        value={selectedValue}
        onChange={handleChange}
        disabled={isDisabled}
      >
        <option value="" className="text-black dark:text-white" disabled>
          Select an option
        </option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id} className="p-10 m-2 text-black dark:text-white">
            {category.title}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div className="flex items-center p-3 mt-2 border border-gray-300 rounded shadow bg-sky-100 dark:bg-darkMode2">
          <img
            src={selectedOption.icon}
            alt={selectedOption.title}
            className="w-6 h-6 mr-2"
          />
          <span className="text-black dark:text-white">{selectedOption.title}</span>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

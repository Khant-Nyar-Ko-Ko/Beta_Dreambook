import React from "react";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search",
  ariaLabel = "Search",
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <IoIosSearch
        className="absolute left-2 top-2 md:top-[10px] text-[16px] md:text-[24px] text-black dark:text-white"
        color="gray"
      />
      <Input
        type="search"
        variant="search"
        className="text-black bg-white pl-7 md:pl-12 dark:text-white dark:bg-darkMode1"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default SearchInput;

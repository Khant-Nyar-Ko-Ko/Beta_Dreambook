/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { IoCloseCircleSharp } from "react-icons/io5";
import React from "react";

interface TagInputProps {
  placeholder: string;
  initialTags: string[];
  tags: string[];
  setTags: (tags: string[]) => void;
  className: string;
  isDisabled: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  placeholder,
  initialTags,
  tags,
  setTags,
  className,
  isDisabled,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags, setTags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className={className}>
      <label
        htmlFor="keywords"
        className="mb-2 font-semibold text-black dark:text-white"
      >
        Keywords
      </label>
      <Input
        id="keywords"
        className="w-[350px] bg-white dark:bg-darkMode1 md:w-full p-1 border border-gray-200 rounded-lg outline-none"
        value={inputValue}
        type="text"
        onChange={handleInputChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
      />
      <div className="flex items-center my-2 gap-x-3">
        {initialTags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 p-1 bg-gray-200 rounded">
            {tag.split(',').map((t, i) => (
              <React.Fragment key={i}>
                <p>{t}</p>
                {i !== tag.split(',').length - 1 && <span>, </span>}
              </React.Fragment>
            ))}
            <button
              className="hover:cursor-pointer"
              onClick={() => handleDeleteTag(tag)}
              disabled={isDisabled}
            >
              <IoCloseCircleSharp />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;

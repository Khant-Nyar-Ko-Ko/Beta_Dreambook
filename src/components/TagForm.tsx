import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FiX } from "react-icons/fi";
import classNames from "classnames";

interface TagInputProps {
  placeholder: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  className?: string;
}

const TagForm: React.FC<TagInputProps> = ({
  placeholder,
  tags,
  setTags,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    <div
      className={classNames(
        "flex flex-wrap items-center text-sm border p-2 rounded",
        className
      )}
    >
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center px-3 py-1 m-1 bg-gray-300 rounded-full"
        >
          <span className="mr-2">{tag}</span>
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => handleDeleteTag(tag)}
          >
            <FiX className="w-3 h-4 text-gray-600" />
          </button>
        </div>
      ))}
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="p-2 border-none focus:ring-0 focus:outline-none"
      />
    </div>
  );
};

export default TagForm;

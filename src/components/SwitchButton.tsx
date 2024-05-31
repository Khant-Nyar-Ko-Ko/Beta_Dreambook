import { useState } from "react";

const SwitchButton = () => {
  const [isDraft, setIsDraft] = useState(true);

  const toggleState = () => {
    setIsDraft(!isDraft);
  };

  return (
    <div className="flex items-center w-60 px-1.5 pt-1 pb-1 rounded-lg  bg-gray-300 font-primary">
      <button
        onClick={toggleState}
        className={`py-2 px-9 rounded-lg transition-colors duration-700 ${
          isDraft ? "bg-yellow-500 text-white" : "bg-gray-300 text-gray-500"
        }`}
      >
        Draft
      </button>
      <button
        onClick={toggleState}
        className={`py-2 px-9 rounded-lg transition-colors duration-700 ${
          !isDraft ? "bg-lime-600 text-white" : "bg-gray-300 text-gray-500"
        }`}
      >
        Public
      </button>
    </div>
  );
};

export default SwitchButton;

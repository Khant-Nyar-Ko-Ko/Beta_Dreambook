import React, { useState } from "react";

const GenderSelect: React.FC = () => {
  const [gender, setGender] = useState<string | null>(null);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <select
        id="gender"
        value={gender || ""}
        onChange={handleGenderChange}
        className="w-full p-2 text-sm border border-gray-200 rounded-lg shadow-sm text-slate-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="" disabled>
          Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default GenderSelect;

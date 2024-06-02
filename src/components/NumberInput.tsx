import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FiPhone } from "react-icons/fi";

const NumberInput: React.FC = () => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className="relative">
     <PhoneInput
      className=" w-[300px] md:w-[350px] bg-white px-4 py-2 rounded"
      defaultCountry="MM"
      value={value}
      onChange={setValue}
      placeholder="Phone" />
      <FiPhone className="absolute right-5 top-3" color="gray"/>
    </div>
  );
};

export default NumberInput;

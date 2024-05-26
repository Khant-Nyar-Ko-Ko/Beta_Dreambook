import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Input } from "./ui/input";
import { LuPhone } from "react-icons/lu";

const NumberInput: React.FC = () => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className="flex flex-col items-center">
      <PhoneInput
        value={value}
        onChange={setValue}
        defaultCountry="MM"
        className="bg-white rounded ps-2"
        inputComponent={() => (
          <div className="relative w-[300px] ">
            <Input type="number" className="w-full" placeholder="Phone" />
            <LuPhone color="slate" className="absolute right-5 top-3" />
          </div>
        )}
      />
      {value && <div className="mt-2 text-gray-700">Phone number: {value}</div>}
    </div>
  );
};

export default NumberInput;

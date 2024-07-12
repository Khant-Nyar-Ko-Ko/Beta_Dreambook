import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FiPhone } from "react-icons/fi";
import { Input } from "../ui/input";

type E164Number = string;

interface PhoneCustomInputProps {
  phoneValue: E164Number | undefined;
  setPhoneValue: (phone: E164Number | undefined) => void;
}

interface InputForPhoneProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  check?: boolean;
  leadicon?: React.ReactNode;
}

const PersonalNumberInput: React.FC<PhoneCustomInputProps> = ({
  phoneValue,
  setPhoneValue,
}: PhoneCustomInputProps) => {
  return (
    <div className="relative border rounded">
      <PhoneInput
        international
        className=" w-[250px] md:w-[500px] bg-white dark:bg-darkMode1 px-4 py-1 rounded"
        defaultCountry="MM"
        value={phoneValue}
        onChange={setPhoneValue}
        placeholder="Phone"
        inputComponent={InputForPhone}
      />
      <FiPhone className="absolute right-5 top-3 md:top-4" color="gray" />
    </div>
  );
};

const InputForPhone = React.forwardRef<HTMLInputElement, InputForPhoneProps>(
  ({ value, onChange, ...rest }, ref) => {
    return (
      <div>
        <Input
          value={value}
          variant="phone"
          onChange={onChange}
          placeholder="Phone"
          leadicon={<FiPhone />}
          ref={ref}
          {...rest}
          className="pl-[200px] border-none bg-white dark:bg-darkMode1 text-black dark:text-white"
        />
      </div>
    );
  }
);

export default PersonalNumberInput;

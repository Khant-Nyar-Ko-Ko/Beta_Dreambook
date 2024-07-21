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
  leadIcon?: React.ReactNode;
}

const NumberInput: React.FC<PhoneCustomInputProps> = ({
  phoneValue,
  setPhoneValue,
}: PhoneCustomInputProps) => {
  return (
    <div className="relative border rounded">
      <PhoneInput
        international
        className=" w-[300px] md:w-[350px] bg-white dark:bg-darkMode1 px-4 py-2 rounded"
        defaultCountry="MM"
        value={phoneValue}
        onChange={setPhoneValue}
        placeholder="Phone"
        inputComponent={InputForPhone}
      />
      <FiPhone className="absolute right-5 top-5" color="gray" />
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
          leadIcon={<FiPhone />}
          ref={ref}
          {...rest}
          className="pl-[100px] bg-white dark:bg-darkMode1 text-black dark:text-white"
        />
      </div>
    );
  }
);

export default NumberInput;

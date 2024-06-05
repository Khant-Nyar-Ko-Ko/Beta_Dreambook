import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FiPhone } from "react-icons/fi";
import { Input } from "./ui/input";

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
    <div className="relative">
      <PhoneInput
        className=" w-[300px] md:w-[350px] bg-white px-4 py-2 rounded"
        defaultCountry="MM"
        value={phoneValue}
        onChange={setPhoneValue}
        placeholder="Phone"
        inputComponent={InputForPhone}
      />
      <FiPhone className="absolute right-5 top-3" color="gray" />
    </div>
  );
};

const InputForPhone = React.forwardRef<HTMLInputElement, InputForPhoneProps>(
  ({ value, onChange, ...rest }, ref) => {
    return (
      <div>
        <Input
          value={value}
          onChange={onChange}
          placeholder="Phone"
          leadIcon={<FiPhone />}
          ref={ref}
          {...rest}
          className="pl-8"
        />
      </div>
    );
  }
);

export default NumberInput;

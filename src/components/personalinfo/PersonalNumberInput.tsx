import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FiPhone } from "react-icons/fi";
import { Input } from "../ui/input";
import { cva } from "class-variance-authority";

type E164Number = string;

const phoneInputVariants = cva(
  "w-[250px] md:w-[500px] bg-white px-4 py-1 rounded",
  {
    variants: {
      variant: {
        default: "dark:bg-white",
        personalInfo: "dark:bg-darkMode1",
        userInfo: "dark:bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface PhoneCustomInputProps {
  phoneValue: E164Number | undefined;
  setPhoneValue: (phone: E164Number | undefined) => void;
  variant?: "default" | "personalInfo" | "userInfo";
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
  variant = "default",
}: PhoneCustomInputProps) => {
  return (
    <div className="relative border rounded">
      <PhoneInput
        international
        className={phoneInputVariants({ variant })}
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
          variant="phone2"
          onChange={onChange}
          placeholder="Phone"
          leadicon={<FiPhone />}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default PersonalNumberInput;

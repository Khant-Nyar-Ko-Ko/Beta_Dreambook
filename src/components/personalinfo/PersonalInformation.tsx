import { Input } from "../ui/input";
import ChangeProfile from "./ChangeProfile";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

const PersonalInformation = () => {
  const [value, setValue] = useState<string | undefined>();
  const [gender, setGender] = useState<string | null>(null);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center w-4/5 gap-3 md:gap-5">
      <ChangeProfile />
      <Input placeholder="Username" variant="info" />
      <Input type="email" placeholder="Email" variant="info" />
      <PhoneInput
        className=" w-[250px] md:w-[500px] bg-white px-3 md:px-6 py-1 md:py-2 rounded border"
        defaultCountry="MM"
        value={value}
        onChange={setValue}
        placeholder="Phone"
      />
      <Textarea className=" w-[250px] md:w-[500px]"/>
      <select
        id="gender"
        value={gender || ""}
        onChange={handleGenderChange}
        className="w-[250px] md:w-[500px] p-2 text-sm border border-gray-200 rounded-lg shadow-sm text-slate-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

export default PersonalInformation;

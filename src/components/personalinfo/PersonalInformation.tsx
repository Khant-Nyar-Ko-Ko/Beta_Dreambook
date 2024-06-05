import { Input } from "../ui/input";
import ChangeProfile from "./ChangeProfile";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { getToken } from "@/service/authService";
import { useUserApi } from "@/hooks/useUserApi";

const PersonalInformation = () => {

  const token = getToken() || "";
  const {data : user} = useUserApi(token);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
  });

  useEffect(() => {
    console.log("User data updated:", user);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      gender: user?.gender || "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData(prevData => ({ ...prevData, phone: value || "" }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prevData => ({ ...prevData, gender: e.target.value }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-4/5 gap-3 md:gap-5">
      <ChangeProfile />
      <Input 
        name="name"
        placeholder="Username" 
        variant="info" 
        value={formData.name} 
        onChange={handleChange} 
      />
      <Input 
        name="email"
        type="email" 
        placeholder="Email" 
        variant="info" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <PhoneInput
        className="w-[250px] md:w-[500px] bg-white px-3 md:px-6 py-1 md:py-2 rounded border"
        defaultCountry="MM"
        value={formData.phone}
        onChange={handlePhoneChange}
        placeholder="Phone"
      />
      <Textarea
        name="bio"
        className="w-[250px] md:w-[500px]"
        value={formData.bio}
        onChange={handleChange}
      />
      <select
        id="gender"
        value={formData.gender}
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

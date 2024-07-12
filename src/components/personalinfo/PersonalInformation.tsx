import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getToken } from "@/service/authService";
import { useUserApi } from "@/hooks/useUserApi";
import { useUpdateUser } from "@/hooks/useAuthApi";
import ImagePreview from "../ImagePreview";
import PersonalNumberInput from "./PersonalNumberInput";
import "react-phone-number-input/style.css";

const PersonalInformation = () => {
  const token = getToken() || "";
  const { data: user } = useUserApi(token);
  const updateUserMutation = useUpdateUser();
  const navigate = useNavigate();

  const initialFormData = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [profileImg, setProfileImg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prevData) => ({ ...prevData, phone: value || "" }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
  };

  const handleProfileImgChange = (profileImg: string) => {
    setProfileImg(profileImg);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = { ...formData, profileImg };
    updateUserMutation.mutate(updatedData, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-4/5 gap-3 text-black bg-white md:gap-5 dark:text-white dark:bg-darkMode1"
    >
      <ImagePreview profileImg={profileImg} onProfileImgChange={handleProfileImgChange} />
      <Input name="name" placeholder="Username" variant="info" value={formData.name} onChange={handleChange} />
      <Input name="email" type="email" placeholder="Email" variant="info" value={formData.email} onChange={handleChange} />
      <PersonalNumberInput phoneValue={formData.phone} setPhoneValue={handlePhoneChange} />
      <Textarea name="bio" className="w-[250px] md:w-[500px] bg-white dark:bg-darkMode1" value={formData.bio} onChange={handleChange} />
      <select
        id="gender"
        value={formData.gender}
        onChange={handleGenderChange}
        className="w-[250px] md:w-[500px] p-2 text-sm border bg-white dark:bg-darkMode1 dark:text-white border-gray-200 rounded-lg shadow-sm text-slate-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="" disabled>Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <div>

      <Button type="submit" className="w-full">Update</Button>
      </div>
    </form>
  );
};

export default PersonalInformation;

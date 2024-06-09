import { Input } from "../ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { getToken } from "@/service/authService";
import { useUserApi } from "@/hooks/useUserApi";
import ImagePreview from "../ImagePreview";
import { Button } from "../ui/button";
import { useUpdateUser } from "@/hooks/useAuthApi";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const token = getToken() || "";
  const { data: user } = useUserApi(token); // Fetch user data using custom hook
  const updateUserMutation = useUpdateUser(); // Hook for updating user data
  const navigate = useNavigate(); // Hook for navigation

  // State to manage form data
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    phone: "",
    bio: "",
    profileImg: "",
  });

  // State to manage form input data
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
  });

  // Effect to update form data when user data changes
  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      gender: user?.gender || "",
    });
  }, [user]);

  // Handle input change for text inputs and textareas
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle phone number input change
  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prevData) => ({ ...prevData, phone: value || "" }));
  };

  // Handle gender select change
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
  };

  // Handle profile image change
  const handleProfileImg = (profileImg: string) => {
    setSignupData((prev) => ({
      ...prev,
      profileImg,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { ...signupData, ...formData }; // Combine form data
    console.log(data); // Log data before the API call
    updateUserMutation.mutate(data); // Make API call to update user data
    navigate("/"); // Navigate to home page after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-4/5 gap-3 md:gap-5"
    >
      <ImagePreview
        profileImg={signupData.profileImg}
        onProfileImgChange={handleProfileImg}
      />
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
      <div>
        <Button type="submit" className="w-full ">
          Update
        </Button>
      </div>
    </form>
  );
};

export default PersonalInformation;

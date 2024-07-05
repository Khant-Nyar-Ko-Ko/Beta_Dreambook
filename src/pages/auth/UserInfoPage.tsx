import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Logo from "@/components/Logo";
import ImagePreview from "@/components/ImagePreview";
import PersonalNumberInput from "@/components/personalinfo/PersonalNumberInput";
import { useUpdateUser } from "@/hooks/useAuthApi";
import { getToken, login } from "@/service/authService";
import Loading from "@/components/Loading";
import background from "../../assets/images/AuthBgImage.avif";

const UserInfoPage = () => {
  const authToken = getToken();
  const updateUserMutation = useUpdateUser();
  const navigate = useNavigate();

  const initialFormData = {
    name: "",
    phone: "",
    bio: "",
    gender: "",
  };

  const [signupData, setSignupData] = useState(initialFormData);
  const [profileImg, setProfileImg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setSignupData((prevData) => ({ ...prevData, phone: value || "" }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSignupData((prevData) => ({ ...prevData, gender: e.target.value }));
  };

  const handleProfileImgChange = (profileImg: string) => {
    setProfileImg(profileImg);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = { ...signupData, profileImg };
  
    updateUserMutation.mutate(updatedData, {
      onSuccess: () => {
        if (authToken) {
          login(authToken);
          navigate("/auth/selectcategory");
        }
      },
      onError: (error) => {
        console.error('Update user failed:', error);
      },
    });
  };
  

  return (
    <div className="relative w-screen h-screen">
      {/* background */}
      <img src={background} className="absolute top-0 left-0 object-cover w-full h-full" alt="Background" />
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-background opacity-80"></div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full ">
        <div className="flex flex-col items-center gap-4">
          {/* logo */}
          <Logo />
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-xl text-white font-primary">Create an account</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col text-center gap-7">
            <div className="flex flex-col gap-5 ">
              <div className="flex items-center justify-center gap-4">
                <ImagePreview profileImg={profileImg} onProfileImgChange={handleProfileImgChange} />
              </div>
              <Input
                className="w-[300px] px-4 py-3"
                name="name"
                placeholder="Full name"
                value={signupData.name}
                onChange={handleChange}
              />
              <PersonalNumberInput phoneValue={signupData.phone} setPhoneValue={handlePhoneChange} />
              <select
                id="gender"
                name="gender"
                value={signupData.gender}
                onChange={handleGenderChange}
                className="w-[250px] md:w-[500px] p-2 text-sm border bg-white dark:bg-darkMode1 dark:text-white border-gray-200 rounded-lg shadow-sm text-slate-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <Textarea
                name="bio"
                placeholder="Bio"
                className="placeholder:text-slate-500"
                value={signupData.bio}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              {updateUserMutation.isPending ? <Loading /> : "Create an account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;

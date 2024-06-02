import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import background from "../../assets/images/AuthBgImage.avif";
import { Textarea } from "@/components/ui/textarea";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ImagePreview from "@/components/ImagePreview";
import NumberInput from "@/components/NumberInput";
import GenderSelect from "@/components/GenderSelect";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/hooks/useAuthApi";
import { login } from "@/service/authService";
import { useAuth } from "@/contexts/AuthContext";

const UserInfoPage = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
  });
  const { user } = useAuth();
  const userId = user?.id;
  const updateUserMutation = useUpdateUser(userId ? userId : "");
  const navigate = useNavigate();

  useEffect(() => {
    const handleSuccess = async () => {
      if (
        updateUserMutation.isSuccess &&
        updateUserMutation.data.access_token
      ) {
        const authToken = updateUserMutation.data.access_token;
        login(authToken);
        navigate("/auth/selectcategory");
      }
    };
    if (updateUserMutation.isSuccess) {
      handleSuccess();
    }
  }, [updateUserMutation.isSuccess]);

  const handleGenderChange = (gender: string) => {
    setSignupData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { ...signupData };
    updateUserMutation.mutate(data);
  };

  return (
    <div className="relative w-screen h-screen">
      {/* background */}
      <img
        src={background}
        className="absolute top-0 left-0 object-cover w-full h-full"
        alt="Background"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-background opacity-80"></div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full ">
        <div className="flex flex-col items-center gap-4">
          {/* logo */}
          <Logo />

          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-xl text-white font-primary">
              Create an account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-center gap-7"
          >
            <div className="flex flex-col gap-5 ">
              <div className="flex items-center justify-center gap-4">
                <ImagePreview />
              </div>
              <div className="flex gap-3">
                <NumberInput />
              </div>
              <Input
                className=" w-[300px] px-4 py-3"
                placeholder="Full name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <GenderSelect
                gender={signupData.gender}
                onGenderChange={handleGenderChange}
              />
              <Textarea
                placeholder="Bio"
                className=" placeholder:text-slate-500"
              />
            </div>
            <NavLink to={"/auth/selectcategory"}>
              <Button type="submit" className="w-full ">
                Create an account
              </Button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;

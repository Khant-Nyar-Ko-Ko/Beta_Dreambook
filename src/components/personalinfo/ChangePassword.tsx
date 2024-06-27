import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/api/userApi";
import { getToken } from "@/service/authService";
import { useUpdateUser } from "@/hooks/useAuthApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  // const [currentPassword, setCurrentPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const updatePassword = useUpdateUser();
  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    gender: "",
    phone: "",
    bio: "",
    profileImg: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken() || "";
      const userProfile = await fetchUserProfile(token);
      if (userProfile) {
        // setCurrentPassword(userProfile.password);
        setSignupData({
          email: userProfile.email,
          name: userProfile.name,
          gender: userProfile.gender,
          phone: userProfile.phone,
          bio: userProfile.bio,
          profileImg: userProfile.profileImg,
          password: "",
        });
      }
    };
    fetchData();
  }, []);

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
    setOldPasswordError("");
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setPasswordMatchError("");
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchError("");
  };

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess("");
    let valid = true;
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(
        "New password and confirmation password do not match"
      );
      valid = false;
    }

    if (!valid) {
      return;
    }
    const data = { ...signupData, password: newPassword };
    updatePassword.mutate(data, {
      onSuccess: () => {
        setUpdateSuccess("Password updated successfully.");
        toast.success("Password updated successfully")
        navigate("/");
      },
      onError: () => {
        setUpdateError("Failed to update password. Please try again.");
      },
    });
  };

  const toggleOldPasswordVisibility = () => {
    setOldShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setNewShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form
      onSubmit={handleChangePassword}
      className="flex flex-col items-center justify-center w-4/5 h-full text-center gap-9"
    >
      <div className="flex flex-col gap-2 px-4 py-8 text-center md:px-0">
        <h2 className="text-base md:text-2xl font-primary">
          Change Your Password
        </h2>
        <p className="text-xs md:text-sm w-[300px] opacity-50 font-primary">
          The new password you set must be different from the previous one
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="relative">
          <Input
            className="w-[200px] md:w-[350px]"
            inputType={showOldPassword ? "text" : "password"}
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={handleOldPassword}
          />
          <button
            type="button"
            onClick={toggleOldPasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showOldPassword ? (
              <FaEyeSlash color="slate" />
            ) : (
              <FaEye color="slate" />
            )}
          </button>
          {oldPasswordError && (
            <p className="mt-1 text-xs text-red-500">{oldPasswordError}</p>
          )}
        </div>
        <div className="relative">
          <Input
            className="w-[200px] md:w-[350px]"
            inputType={showNewPassword ? "text" : "password"}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={handleNewPassword}
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showNewPassword ? (
              <FaEyeSlash color="slate" />
            ) : (
              <FaEye color="slate" />
            )}
          </button>
        </div>
        <div className="relative">
          <Input
            className="w-[200px] md:w-[350px]"
            inputType={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-5 top-2 md:top-3 focus:outline-none"
          >
            {showConfirmPassword ? (
              <FaEyeSlash color="slate" />
            ) : (
              <FaEye color="slate" />
            )}
          </button>
          {passwordMatchError && (
            <p className="mt-1 text-xs text-red-500">{passwordMatchError}</p>
          )}
        </div>
      </div>
      {updateError && (
        <p className="mt-4 text-xs text-red-500">{updateError}</p>
      )}
      {updateSuccess && (
        <p className="mt-4 text-xs text-green-500">{updateSuccess}</p>
      )}
      <Button type="submit" className="w-[200px] md:w-[350px]">
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassword;

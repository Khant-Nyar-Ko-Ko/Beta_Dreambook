import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/api/userApi";
import { getToken } from "@/service/authService";
import { useUpdateUser } from "@/hooks/useAuthApi";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ChangePassword = () => {
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
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
    setNewPasswordError("");
    setPasswordMatchError("");
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
    setPasswordMatchError("");
  };

  const validate = () => {
    let valid = true;

    if (!oldPassword) {
      setOldPasswordError("Old password is required.");
      valid = false;
    }

    if (!newPassword) {
      setNewPasswordError("New password is required.");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatchError("New password and confirmation password do not match.");
      valid = false;
    }

    return valid;
  };

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess("");

    if (!validate()) {
      return;
    }

    const data = { ...signupData, password: newPassword };

    updatePassword.mutate(data, {
      onSuccess: () => {
        setUpdateSuccess("Password updated successfully.");
        navigate("/");
        setTimeout(() => {
          setUpdateSuccess("");
        }, 5000);
      },
      onError: () => {
        setUpdateError("Failed to update password. Please try again.");
        setTimeout(() => {
          setUpdateError("");
        }, 5000);
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

  const renderError = (error: string) => error && <p className="mt-1 text-xs text-red-500">{error}</p>;

  return (
    <motion.form
      onSubmit={handleChangePassword}
      className="flex flex-col items-center justify-center w-4/5 h-[670px] overflow-y-auto text-center gap-9"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col gap-2 px-4 py-0 text-center md:py-8 md:px-0"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <h2 className="text-base md:text-2xl font-primary">Change Your Password</h2>
        <p className="text-xs md:text-sm md:w-[300px] opacity-50 font-primary">
          The new password you set must be different from the previous one
        </p>
      </motion.div>
      <motion.div
        className="flex flex-col gap-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          className="relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
            aria-label={showOldPassword ? "Hide old password" : "Show old password"}
          >
            {showOldPassword ? <FaEyeSlash color="slate" /> : <FaEye color="slate" />}
          </button>
          {renderError(oldPasswordError)}
        </motion.div>
        <motion.div
          className="relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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
            aria-label={showNewPassword ? "Hide new password" : "Show new password"}
          >
            {showNewPassword ? <FaEyeSlash color="slate" /> : <FaEye color="slate" />}
          </button>
          {renderError(newPasswordError)}
        </motion.div>
        <motion.div
          className="relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
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
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? <FaEyeSlash color="slate" /> : <FaEye color="slate" />}
          </button>
          {renderError(confirmPasswordError)}
          {renderError(passwordMatchError)}
        </motion.div>
      </motion.div>
      {renderError(updateError)}
      {updateSuccess && (
        <motion.p
          className="mt-4 text-xs text-green-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {updateSuccess}
        </motion.p>
      )}
      <Button
        type="submit"
        className="w-[200px] md:w-[350px]"
      >
        <Loader2
          className={updatePassword.isPending ? "block animate-spin" : "hidden"}
        />
        Change Password
      </Button>
    </motion.form>
  );
};

export default ChangePassword;

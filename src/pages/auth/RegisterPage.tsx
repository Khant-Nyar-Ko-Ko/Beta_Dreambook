import { Input } from "@/components/ui/input";
import background from "../../assets/images/AuthBgImage.avif";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { IoPerson } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSignUpUser } from "@/hooks/useAuthApi";
import { useAuth } from "@/contexts/AuthContext";
import { getToken } from "@/service/authService";
import Loading from "@/components/Loading";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [samePassword, setSamePassword] = useState(true);
  const [signupData, setSignupData] = useState({
    email: "",
    access_token: "",
    password: "",
    confirmPassword: "",
  });
  const signupMutation = useSignUpUser();
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  useEffect(() => {
    setSamePassword(signupData.password === signupData.confirmPassword);
  }, [signupData.password, signupData.confirmPassword]);

  useEffect(() => {
    const handleSuccess = async () => {
      if (signupMutation.isSuccess) {
        const authToken = getToken();
        if (authToken) {
          login(authToken);
          navigate("/auth/userinfo");
        }
      }
    };
    if (signupMutation.isSuccess) {
      handleSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupMutation.isSuccess]);

  useEffect(() => {
    if (signupMutation.isError) {
      console.log(signupMutation.error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupMutation.isError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (samePassword && signupData.email && signupData.password) {
      const data = { ...signupData };
      signupMutation.mutate(data);
    }
  };

  return (
    <div className="relative h-screen w-scr een">
      <img
        src={background}
        className="absolute top-0 left-0 object-cover w-full h-full"
        alt="Background"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-background opacity-80"></div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-7 md:gap-9">
          <Logo />
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl text-white font-primary">
              Create an account
            </h2>
            <p className="text-white font-primary">
              Get started to share books & reading
            </p>
          </div>
          <div className="flex flex-col text-center gap-9">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="relative">
                <Input
                  className="w-full"
                  type="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <IoPerson
                  color="slate"
                  className="absolute right-5 top-2 md:top-3"
                />
              </div>

              <div className="relative">
                <Input
                  className="w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-5 top-2 md:top-3 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEye color="slate" />
                  ) : (
                    <FaEyeSlash color="slate" />
                  )}
                </button>
              </div>
              <div className="relative">
                <Input
                  className="w-full"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-5 top-2 md:top-3 focus:outline-none"
                  >
                  {showConfirmPassword ? (
                    <FaEye color="slate" />
                    ) : (
                      <FaEyeSlash color="slate" />
                      )}
                </button>
                    {signupMutation.isError && <p className="pt-2 text-xs text-red-500">Your Email or Password is invalid</p>} 
              </div>
              <div className="flex justify-center w-full">
                <Button
                  type="submit"
                  className={`w-[300px] md:w-[350px] ${
                    signupData.email && signupData.password && samePassword
                      ? ""
                      : "disabled"
                  }`}
                  disabled={
                    !signupData.email ||
                    !signupData.password ||
                    !samePassword ||
                    signupMutation.isPending
                  }
                >
                  {signupMutation.isPending ? <Loading /> : "Create an account"}
                </Button>
              </div>
            </form>

            <div className="flex items-center justify-center font-primary">
              <p className="text-sm text-white md:text-base ">
                {" "}
                Already have an account?
              </p>
              <NavLink to={"/auth/login"}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-sm font-semibold cursor-pointer md:text-base"
                >
                  Login
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

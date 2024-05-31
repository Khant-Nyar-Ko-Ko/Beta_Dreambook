import { Input } from "@/components/ui/input";
import background from "../../assets/images/AuthBgImage.avif";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { IoPerson } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSignUpUser } from "@/hooks/useAuthApi";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    gender: null
  });
  const signupMutation = useSignUpUser();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (signupMutation.isSuccess) {
      console.log(signupMutation.data);
      navigate('/auth/userinfo')
    }
  }, [signupMutation.isSuccess]);

  useEffect(() => {
    if (signupMutation.isError) {
      console.log(signupMutation.error.message);
    }
  }, [signupMutation.isError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { ...signupData };
    signupMutation.mutate(data);
  };

  return (
    <div className="relative w-screen h-screen">
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
                    <FaEyeSlash color="slate" />
                  ) : (
                    <FaEye color="slate" />
                  )}
                </button>
              </div>
              <div className="relative">
                <Input
                  className="w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-5 top-2 md:top-3 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash color="slate" />
                  ) : (
                    <FaEye color="slate" />
                  )}
                </button>
              </div>
              <div className="flex justify-center w-full">
                <Button type="submit" className="w-[300px] md:w-[350px]">
                {signupMutation.isPending ? <Loader2/> : "Create an account"}
                  
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

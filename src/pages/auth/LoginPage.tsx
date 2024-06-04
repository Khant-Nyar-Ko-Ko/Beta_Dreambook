import { Input } from "@/components/ui/input";
import background from "../../assets/images/AuthBgImage.avif";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { IoPerson } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSignInUser } from "@/hooks/useAuthApi";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; 
import { getToken } from "@/service/authService";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signinData, setSigninData] = useState({
    email: "tonystark12@gmail.com",
    password: "ironman",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const signinMutation = useSignInUser();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleSuccess = async () => {
      if (signinMutation.isSuccess) {
        const authToken = getToken();
        if(authToken)login(authToken);
        navigate("/");
      }
    };
    if (signinMutation.isSuccess) {
      handleSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signinMutation.isSuccess]);

  useEffect(() => {
    if (signinMutation.isError) {
      console.log(signinMutation.error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signinMutation.isError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signinMutation.mutate(signinData);
  };

  return (
    <div className="relative w-screen h-screen">
      <img
        src={background}
        className="absolute top-0 left-0 object-cover w-full h-full"
        alt="Background"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-background opacity-80"></div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full ">
        <div className="flex flex-col items-center gap-7 md:gap-9">
          <Logo />
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl text-white font-primary">Welcome again!</h2>
            <p className="text-white font-primary">
              Please login to your account
            </p>
          </div>
          <div className="flex flex-col text-center gap-9">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 ">
              <div className="relative ">
                <Input
                  className="w-full"
                  inputType="email"
                  placeholder="Username"
                  value={signinData.email}
                  onChange={(e) =>
                    setSigninData((prev) => ({
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
                  inputType={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signinData.password}
                  onChange={(e) =>
                    setSigninData((prev) => ({
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
              <div className="flex justify-center w-full">
                <Button type="submit" className=" w-[300px] md:w-[350px]">
                  {signinMutation.isPending ? <Loader2 /> : "Login"}
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center font-primary">
              <p className="text-sm text-white md:text-base ">
                Don't have an account?
              </p>
              <NavLink to={"/auth/register"}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-sm font-semibold cursor-pointer md:text-base"
                >
                  Signup
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

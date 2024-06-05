import { createContext, useContext } from "react";
import React from "react";
import * as authService from "@/service/authService";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const token = authService.getToken() || null;

  const login = async (token: string) => {
    authService.login(token);
  };

  const logout = () => {
    authService.logout();
  };

  // const fetchUserProfile = async (token: string): Promise<User> => {
  //   const response = await fetch(`${BaseURL}/users/me`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch");
  //   }
  //   return response.json();
  // };

  // useEffect(() => {
  //   const storedToken = authService.getToken();
  //   if (storedToken) {
  //     setToken(storedToken);
  //     if (token) {
  //       fetchUserProfile(token).then(setUser).catch(console.error);
  //     }
  //   }
  // }, [token, user]);


  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

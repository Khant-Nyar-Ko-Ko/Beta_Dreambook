import { createContext, useContext, useEffect, useState } from "react";
import React from "react"
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
  const [token, setToken] = useState<string | null>(authService.getToken() || null);


  const login = (token: string) => {
    authService.login(token);
    setToken(token);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
  };

  useEffect(() => {
    const storedToken = authService.getToken();
    if(storedToken){
      setToken(storedToken);
    }
  }, [])
  

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

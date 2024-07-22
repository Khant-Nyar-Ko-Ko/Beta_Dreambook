/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<any>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: {children : ReactNode}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDark.addEventListener("change", (e) => {
      if (theme === "system") {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    });
    return () => {
      prefersDark.removeEventListener("change", () => {});
    };
  }, [theme]);

  const changeTheme = (newTheme: any) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

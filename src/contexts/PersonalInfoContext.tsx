/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

const PersonalInfoContext = createContext<any>(null);

export const PersonalInfoProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    title: "",
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(
    searchParams.get("title") || undefined
  );
  const [searchTitle, setSearchTitle] = useState<string | undefined>(
    searchParams.get("title") || undefined
  );
  const [sort, setSort] = useState<string>(
    searchParams.get("sort") || "latest"
  );

  useEffect(() => {
    const params: Record<string, string> = { sort };
    if (searchTitle) {
      params.title = searchTitle;
    }
    setSearchParams(params);
  }, [sort, searchTitle, setSearchParams]);

  return (
    <PersonalInfoContext.Provider
      value={{
        searchInput,
        setSearchInput,
        searchTitle,
        setSearchTitle,
        sort,
        setSort,
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePersonalInfoContext = () => useContext(PersonalInfoContext);

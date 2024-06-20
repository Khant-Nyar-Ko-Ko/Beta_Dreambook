/* eslint-disable react-refresh/only-export-components */
import { CategoryContextType } from "@/utils/type";
import { createContext, ReactNode, useContext, useState } from "react";

const defaultValue: CategoryContextType = {
    selectedCategories: null,
    setCategory: () => {}, 
  };

const CategoryContext = createContext<CategoryContextType>(defaultValue);

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({children}:{children : ReactNode}) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    const setCategory = (categoryIds: string[] | null) => {
        setSelectedCategories(categoryIds || []);
      }

    return (
        <CategoryContext.Provider value={{selectedCategories, setCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}
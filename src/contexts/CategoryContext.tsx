/* eslint-disable react-refresh/only-export-components */
import { CategoryContextType } from "@/utils/type";
import { createContext, ReactNode, useContext, useState } from "react";

const defaultValue: CategoryContextType = {
    selectedCategoryId: null,
    setCategory: () => {}, 
  };

const CategoryContext = createContext<CategoryContextType>(defaultValue);

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({children}:{children : ReactNode}) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const setCategory = (categoryId : string | null) => {
        setSelectedCategoryId(categoryId)
    }

    return (
        <CategoryContext.Provider value={{selectedCategoryId, setCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}
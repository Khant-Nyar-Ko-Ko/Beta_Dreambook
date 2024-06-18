/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCategory } from "@/contexts/CategoryContext";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { useEffect, useState } from "react";

const CheckboxWithText = () => {
  const { data: categories, isLoading, error } = useFetchCategories();
  const { setCategory } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (selectedCategory === "all") {
      setCategory(null);
    } else {
      setCategory(selectedCategory);
    }
  }, [selectedCategory, setCategory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading books</div>;
  }

  if (!categories || categories.length === 0) {
    return <div>No popular books available</div>;
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      setCategory(null);
    } else {
      setCategory(categoryId);
    }
  };

  return (
    <>
      <div className="flex space-x-2 items-top">
        <input
          type="radio"
          id="all"
          name="category"
          checked={selectedCategory === "all"}
          onChange={() => handleCategoryChange("all")}
        />
        <label
          htmlFor="all"
          className={`text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            selectedCategory === "all" ? "text-blue-600" : ""
          }`}
        >
          All
        </label>
      </div>
      {categories.map(({ id, title }) => (
        <div className="flex space-x-2 items-top" key={id}>
          <input
            id={`checkbox-${id}`}
            type="radio"
            name="category"
            checked={selectedCategory === String(id)}
            onChange={() => handleCategoryChange(String(id))}
          />
          <label
            htmlFor={`checkbox-${id}`}
            className={`text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              selectedCategory === String(id) ? "text-blue-600" : ""
            }`}
          >
            {title}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckboxWithText;

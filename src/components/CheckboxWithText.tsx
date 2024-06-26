import { useCategory } from "@/contexts/CategoryContext";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { useEffect, useState, useCallback } from "react";

const CheckboxWithText = () => {
  const { data: categories = [], isLoading, error } = useFetchCategories();
  const { setCategory }: { setCategory: (categories: number[] | null) => void } = useCategory();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(true);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setCategory(null);
    } else {
      setCategory(selectedCategories.map(id => parseInt(id, 10)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    if (categoryId === "all") {
      setIsAllChecked(!isAllChecked);
    } else {
      setSelectedCategories((prevSelectedCategories) => {
        const isAlreadySelected = prevSelectedCategories.includes(categoryId);
        return isAlreadySelected
          ? prevSelectedCategories.filter((id) => id !== categoryId)
          : [...prevSelectedCategories, categoryId];
      });
      setIsAllChecked(false);
    }
  }, [isAllChecked]);

  if (isLoading) {
    return <div className="text-black dark:text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-black dark:text-white">Error loading categories. Please try again later.</div>;
  }

  if (categories.length === 0) {
    return <div className="text-black dark:text-white">No categories available</div>;
  }

  return (
    <>
      <div className="flex space-x-2 items-top">
        <input
          type="checkbox"
          id="all"
          name="category"
          checked={isAllChecked}
          onChange={() => handleCategoryChange("all")}
        />
        <label htmlFor="all" className="text-sm font-medium leading-none text-black select-none dark:text-white">
          All
        </label>
      </div>
      {categories.map(({ id, title }) => (
        <div className="flex space-x-2 items-top" key={id}>
          <input
            id={`checkbox-${id}`}
            type="checkbox"
            name="category"
            checked={selectedCategories.includes(id.toString())}
            onChange={() => handleCategoryChange(id.toString())}
          />
          <label htmlFor={`checkbox-${id}`} className="text-sm font-medium leading-none text-black select-none dark:text-white">
            {title}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckboxWithText;
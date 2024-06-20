import { useCategory } from "@/contexts/CategoryContext";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { useEffect, useState, useMemo, useCallback } from "react";

const CheckboxWithText = () => {
  const { data: categories = [], isLoading, error } = useFetchCategories();
  const { setCategory }: { setCategory: (categories: number[] | null) => void } = useCategory();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setCategory(null);
    } else {
      setCategory(selectedCategories.map(id => parseInt(id, 10)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (categoryId === "all") {
        return prevSelectedCategories.length === 0 || prevSelectedCategories.length < categories.length
         ? categories.map(({ id }) => id.toString())
          : [];
      } else {
        return prevSelectedCategories.includes(categoryId)
         ? prevSelectedCategories.filter((id) => id!== categoryId)
          : [...prevSelectedCategories, categoryId];
      }
    });
  }, [categories]);

  const isAllSelected = useMemo(() => {
    return categories && categories.length > 0 && selectedCategories.length === categories.length;
  }, [selectedCategories, categories]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories. Please try again later.</div>;
  }

  if (categories.length === 0) {
    return <div>No categories available</div>;
  }

  return (
    <>
      <div className="flex space-x-2 items-top">
        <input
          type="checkbox"
          id="all"
          name="category"
          checked={isAllSelected}
          onChange={() => handleCategoryChange("all")}
        />
        <label htmlFor="all" className="text-sm font-medium leading-none select-none">
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
          <label htmlFor={`checkbox-${id}`} className="text-sm font-medium leading-none select-none">
            {title}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckboxWithText;
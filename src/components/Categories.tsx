import { useState } from "react";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { useSelectCategory } from "@/hooks/useSelectCategoryApi";

const Categories = () => {
  const { mutate : selectCategory} = useSelectCategory();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const { data: categories, isLoading, error } = useFetchCategories();

  const handleDivClick = ({ id }: { id: number }) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    selectCategory(id);
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">Error loading categories</div>;
  }

  if (!categories || categories.length === 0) {
    return <div className="text-white">No categories available</div>;
  }

  return (
    <>
      {categories.map(({ id, title, icon }) => (
        <div
          key={id}
          className="flex items-center gap-2 px-2 py-1 bg-white rounded cursor-pointer md:px-4"
          onClick={() => handleDivClick({ id })}
        >
          <input
            type="checkbox"
            checked={checkedItems[id] || false}
            onChange={() => handleDivClick({ id })}
          />
          <img className="w-8 h-auto md:w-10 md:h-10" src={icon} alt={title} />
          <p className="text-[10px] md:text-sm font-primary">{title}</p>
        </div>
      ))}
    </>
  );
};

export default Categories;
// import bussiness from "../assets/images/categories/bussiness.png";

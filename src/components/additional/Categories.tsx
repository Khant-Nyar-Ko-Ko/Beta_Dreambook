import { useState } from "react";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { useSelectCategory } from "@/hooks/useSelectCategoryApi";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { mutate: selectCategory } = useSelectCategory();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const { data: categories, isLoading, error } = useFetchCategories();
  const navigate = useNavigate();

  const handleDivClick = ({ id }: { id: number }) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSubmit = () => {
    const selectedCategoryIds = Object.keys(checkedItems).filter(id => checkedItems[Number(id)]);
    selectCategory(selectedCategoryIds.map(Number));
    navigate('/library')
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
    <div className="">
    <div className="grid gap-5 md:grid-cols-2 overflow-y-auto h-[350px]">
      {categories.map(({ id, title, icon }) => (
        <div
        key={id}
        className="flex items-center gap-2 px-2 py-1 bg-white rounded cursor-pointer md:px-4"
        onClick={() => handleDivClick({ id })}
        >
          <input
            type="checkbox"
            checked={!!checkedItems[id]}
            onChange={() => handleDivClick({ id })}
            />
          <img className="w-8 h-auto md:w-10 md:h-10" src={icon} alt={title} />
          <p className="text-[10px] md:text-sm font-primary">{title}</p>
        </div>
      ))}
    </div>
      <button onClick={handleSubmit} className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded">
       Finish
      </button>
      </div>
  );
};

export default Categories;

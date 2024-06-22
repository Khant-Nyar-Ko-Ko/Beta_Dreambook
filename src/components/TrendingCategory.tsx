import { useFetchTrendingCategories } from "@/hooks/useCategoryApi";
import CategoryLoading from "./Loading/CategoryLoading";
import { useCategory } from "@/contexts/CategoryContext";
import { useNavigate } from "react-router-dom";

const TrendingCategory = () => {
  const {
    data: trendingCategories,
    isLoading,
    error,
  } = useFetchTrendingCategories();

  const { setCategory } = useCategory();
  const navigate = useNavigate();

  const handleCategoryChange = (categoryId: string) => {
    setCategory([categoryId]);
    navigate("/library");
  };

  if (isLoading) {
    return <CategoryLoading />;
  }

  if (error) {
    return <div>Error loading books</div>;
  }

  if (!trendingCategories || trendingCategories.length === 0) {
    return <div>No popular books available</div>;
  }

  return (
    <>
      {trendingCategories.map(
        ({ id, title, icon }: { id: number; title: string; icon: string }) => (
          <div
            key={id}
            className="flex items-center w-[300px] md:w-[370px] gap-10 px-4 py-2 bg-white dark:bg-darkMode1 border-slate-600 dark:border-slate-400 text-black dark:text-white border rounded cursor-pointer"
            onClick={() => handleCategoryChange(String(id))}
          >
            <img className="w-10 h-10" src={icon} alt="" />
            <p className="text-sm font-semibold ">{title}</p>
          </div>
        )
      )}
    </>
  );
};

export default TrendingCategory;

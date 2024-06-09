import { useFetchCategories } from "@/hooks/useCategoryApi";



const TrendingCategory = () => {

  const {data : trendingCategory, isLoading, error} = useFetchCategories();
  console.log(trendingCategory);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading books</div>;
  }

  if (!trendingCategory || trendingCategory.length === 0) {
    return <div>No popular books available</div>;
  }
  

  return (
    <>
    {trendingCategory.map(({id, title, icon}) => (
      <div
        key={id}
        className="flex items-center w-[300px] md:w-[370px] gap-10 px-4 py-2 bg-white border rounded cursor-pointer"
      >
        <img className="w-10 h-10" src={icon} alt="" />
        <p className="text-sm font-semibold ">{title}</p>
      </div>
    ))}
  </>
  )
}

export default TrendingCategory
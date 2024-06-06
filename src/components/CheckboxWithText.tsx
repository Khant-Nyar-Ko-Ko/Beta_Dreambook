import { Checkbox } from "@/components/ui/checkbox";
import { useFetchCategories } from "@/hooks/useCategoryApi";

const CheckboxWithText = () => {
  const { data: category, isLoading, error } = useFetchCategories();
  console.log(category);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading books</div>;
  }

  if (!category || category.length === 0) {
    return <div>No popular books available</div>;
  }
  return (
    <>
      {category.map(({ id, title }) => (
        <div className="flex space-x-2 items-top" key={id}>
          <Checkbox id={`checkbox-${id}`} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={`checkbox-${id}`}
              className="text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {title}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default CheckboxWithText;

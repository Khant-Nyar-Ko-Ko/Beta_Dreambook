import { useCategory } from "@/contexts/CategoryContext";
import { useLibraryContext } from "@/contexts/LibraryContext";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { categoryType } from "@/utils/type";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonBox = () => (
  <Grid container wrap="nowrap" className="flex flex-col gap-2">
    <Box sx={{ width: 200, marginRight: 2, marginBottom: 2 }}>
      <Skeleton variant="rectangular" height={20} />
    </Box>
  </Grid>
);

const SkeletonList = () => (
  <div className="flex flex-col">
    {[...Array(10)].map((_, index) => (
      <SkeletonBox key={index} />
    ))}
  </div>
);

const CheckboxWithText = () => {
  const { categoryId } = useParams();
  const { selectedCategories, setSelectedCategories } = useLibraryContext();

  const { data: categories = [], isLoading, error } = useFetchCategories();
  const {
    setCategory,
  }: { setCategory: (categories: number[] | null) => void } = useCategory();
  const [isAllChecked, setIsAllChecked] = useState(true);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategories([categoryId]);
    }
  }, [categoryId, setSelectedCategories]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setCategory(null);
    } else {
      setCategory(selectedCategories.map((id: string) => parseInt(id, 10)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      if (categoryId === "all") {
        setIsAllChecked(!isAllChecked);
      } else {
        setSelectedCategories((prevSelectedCategories: string[]) => {
          const isAlreadySelected = prevSelectedCategories.includes(categoryId);
          return isAlreadySelected
            ? prevSelectedCategories.filter((id: string) => id !== categoryId)
            : [...prevSelectedCategories, categoryId];
        });
        setIsAllChecked(false);
      }
    },
    [isAllChecked, setSelectedCategories]
  );

  useEffect(() => {
    if (
      (categories as categoryType[]).every(
        (category) => !selectedCategories.includes(category.id.toString())
      )
    ) {
      setIsAllChecked(true);
    }
  }, [categories, selectedCategories]);
  
  if (isLoading) {
    return <SkeletonList />;
  }
  

  if (error) {
    return (
      <div className="text-black dark:text-white">
        Error loading categories. Please try again later.
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-black dark:text-white">No categories available</div>
    );
  }

  return (
    <div className="flex flex-col gap-7 md:gap-5">
      <div className="flex space-x-2 items-top">
        <input
          type="checkbox"
          id="all"
          name="category"
          checked={isAllChecked}
          onChange={() => handleCategoryChange("all")}
        />
        <label
          htmlFor="all"
          className="text-sm font-medium leading-none text-black select-none dark:text-white"
        >
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
          <label
            htmlFor={`checkbox-${id}`}
            className="text-sm font-medium leading-none text-black select-none dark:text-white"
          >
            {title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxWithText;

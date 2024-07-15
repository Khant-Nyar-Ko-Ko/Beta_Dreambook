import { useFetchSingleBook, useUpdateBook } from "@/hooks/useBookApi";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const SwitchButton = () => {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  
  
  const { data: createdBook } = useFetchSingleBook(slug ?? "");
  const bookUpdateMutation = useUpdateBook();
  const [isPublish, setIsPublish] = useState<boolean>(createdBook?.status);


  const handlePublish = () => {
    setIsPublish(!isPublish);
    const bookData = {
      ...createdBook,
      status: !isPublish,
    };
    bookUpdateMutation.mutate(bookData, {
      onSuccess: () => {
        toast(!isPublish ? "Published" : "Drafted");
        queryClient.invalidateQueries({ queryKey: ['singleBook'] });
      },
    });
  };

  return (
    <div
      onClick={handlePublish}
      className="flex gap-1 items-center md:w-60 px-1.5 pt-1 pb-1 rounded-lg  bg-gray-300 dark:bg-darkMode1 font-primary"
    >
      <button
        className={`py-2 px-3 md:px-9 rounded-lg transition-colors duration-700 ${
          !isPublish
            ? "bg-yellow-500 text-white"
            : "bg-gray-300 dark:bg-darkMode3 text-gray-500 dark:text-white"
        }`}
      >
        Draft
      </button>
      <button
        className={`py-2 px-3 md:px-9 rounded-lg transition-colors duration-700 ${
          isPublish
            ? "bg-lime-600 text-white"
            : "bg-gray-300 dark:bg-darkMode3 text-gray-500 dark:text-white"
        }`}
      >
        Public
      </button>
    </div>
  );
};

export default SwitchButton;

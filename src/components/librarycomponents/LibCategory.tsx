import CheckboxWithText from "../CheckboxWithText";

const LibCategory = () => {
  return (
    <div className="flex-col items-center justify-start hidden w-1/4 h-auto gap-5 py-10 md:flex bg-blue-50 dark:bg-darkMode1">
      <h6 className="text-lg font-bold text-black dark:text-white">Categories</h6>
     
        <CheckboxWithText />
    </div>
  );
};

export default LibCategory;

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const toolbarVariants = cva(
  "block border-black rounded-md duration-300",
  {
    variants: {
      variant: {
        default: "text-black bg-white dark:text-white dark:bg-darkMode1",
        craft: "text-black bg-white dark:text-white dark:bg-darkMode1 h-[150px] md:w-[600px]",
        edit: "text-blue-500 bg-white dark:text-white-300 dark:bg-slate-400 w-[300px] h-full md:w-[950px]",
        custom2: "text-red-500 bg-yellow-200 dark:text-red-300 dark:bg-yellow-700",
      },
      size: {
        sm: "h-10 text-xs",
        md: "h-10 text-sm",
        lg: "h-[150px] text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ToolbarProps extends VariantProps<typeof toolbarVariants> {
  value: string;
  onChange: (value: string) => void;
  isDisabled: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ value, onChange, isDisabled, variant, size }) => {

  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const handleChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <div className="custom-quill ql-color-blue">
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={handleChange}
        readOnly={isDisabled}
        className={cn(toolbarVariants({ variant, size }))}
      />
    </div>
  );
};

export default Toolbar;

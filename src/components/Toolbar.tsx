import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ToolbarProps {
  value: string;
  onChange: (value: string) => void;
  isDisabled: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ value, onChange, isDisabled }) => {

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
    <div>
      <div>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={value}
          onChange={handleChange}
          readOnly={isDisabled}
        />
      </div>
    </div>
  );
};

export default Toolbar;
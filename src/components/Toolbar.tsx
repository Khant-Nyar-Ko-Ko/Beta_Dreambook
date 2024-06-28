import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ToolbarProps {
  value: string;
  onChange: (value: string) => void;
  // isEditMode: boolean | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Toolbar;

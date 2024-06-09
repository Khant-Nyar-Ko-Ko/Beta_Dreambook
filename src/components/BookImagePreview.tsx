// import React, { useState, ChangeEvent } from "react";

// import bookImg from "../assets/images/bookCrafting/bookImg.png";

// import authorprofile from "../assets/images/Author.png";

// const BookImagePreview: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setSelectedFile(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }
//     // Handle the file upload
//     console.log("File to upload:", selectedFile);
//   };

//   return (
//     <div className="max-w-md p-4 mx-auto bg-white shadow-md">
//       <h1 className="text-sm text-center">Book Image</h1>
//       <div className="p-4 border border-gray-400 border-dashed rounded-md">
//         <form onSubmit={handleSubmit}>
//           <div className="relative ">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//             {preview ? (
//               <img
//                 src={preview}
//                 alt="Book Cover Preview"
//                 className="w-48 h-64 mx-auto rounded-md"
//               />
//             ) : (
//               <div className="flex items-center justify-center w-48 h-64 mx-auto border-2 border-gray-300 border-dashed rounded-md ">
//                 <div className="text-center">
//                   <img
//                     className="w-10 h-10 mx-auto text-gray-400"
//                     src={bookImg}
//                     alt="Icon"
//                   />
//                   <p className="mt-2 text-sm text-gray-600">Click to upload</p>
//                   <p className="text-xs text-gray-500">JPG, JPEG, or PNG</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//       <div className="flex flex-col mt-4 rounded-md shadow-sm">
//         <h1 className="mt-5 mb-4 text-sm text-center">Preview Card Desgin</h1>
//         <div className="flex flex-col gap-1 mx-3 h-28 w-42">
//           <div className="flex gap-1 ">
//             <img
//               src={preview ?? undefined}
//               alt="Book Cover Preview"
//               className="mx-auto rounded-md h-28 w-42 "
//             />
//           </div>
//           <div className="flex flex-col gap-2 mt-2 items-left ">
//             <p className="text-sm font-bold font-primary text-start">
//               FINANCIAL FREEDOM
//             </p>
//             <p className="text-left text-sx font-primary text-slate-500">
//               Finecence
//             </p>
//             <div className="flex gap-3">
//               <img
//                 src={authorprofile}
//                 className="w-6 h-6 rounded-full"
//                 alt="author"
//               />
//               <p className="text-sm font-primary">By Dr. Phil McGraw</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookImagePreview;

// src/components/BookImagePreview.tsx
import React, { useState, ChangeEvent } from "react";
import bookImg from "../assets/images/bookCrafting/bookImg.png";
import authorprofile from "../assets/images/Author.png";

interface BookImagePreviewProps {
  title: string;
}

const BookImagePreview: React.FC<BookImagePreviewProps> = ({ title }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    // Handle the file upload
    console.log("File to upload:", selectedFile);
  };

  return (
    <div className="max-w-md p-4 mx-auto bg-white shadow-md">
      <h1 className="text-sm text-center">Book Image</h1>
      <div className="p-4 border border-gray-400 border-dashed rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="relative ">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <img
                src={preview}
                alt="Book Cover Preview"
                className="w-48 h-64 mx-auto rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center w-48 h-64 mx-auto border-2 border-gray-300 border-dashed rounded-md ">
                <div className="text-center">
                  <img
                    className="w-10 h-10 mx-auto text-gray-400"
                    src={bookImg}
                    alt="Icon"
                  />
                  <p className="mt-2 text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-500">JPG, JPEG, or PNG</p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="flex flex-col mt-4 rounded-md shadow-sm">
        <h1 className="mt-5 mb-4 text-sm text-center">Preview Card Design</h1>
        <div className="flex flex-col gap-1 mx-3 h-28 w-42">
          <div className="flex gap-1 ">
            <img
              src={preview ?? undefined}
              alt="Book Cover Preview"
              className="mx-auto rounded-md h-28 w-42"
            />
          </div>
          <div className="flex flex-col gap-2 mt-2 items-left ">
            <p className="text-sm font-bold font-primary text-start">{title}</p>
            <p className="text-left text-sx font-primary text-slate-500">
              Finecence
            </p>
            <div className="flex gap-3">
              <img
                src={authorprofile}
                className="w-6 h-6 rounded-full"
                alt="author"
              />
              <p className="text-sm font-primary">By Dr. Phil McGraw</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookImagePreview;

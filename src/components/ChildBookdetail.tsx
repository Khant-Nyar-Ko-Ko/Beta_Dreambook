// import { Outlet } from "react-router-dom";
// import SwitchButton from "./SwitchButton";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "./ui/input";
// import CustomDropdown from "./customDropDown";
// import Toolbar from "./Toolbar";
// import BookImagePreview from "../components/BookImagePreview";
// import { useState } from "react";
// import TagInput from "./TagForm";
// import { Button } from "./ui/button";

// const ChildBookdetail = () => {
//   const [tags, setTags] = useState<string[]>([]);
//   return (
//     <div className="flex flex-col w-4/5 h-auto px-3 my-5">
//       <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50">
//         <h1 className="mx-5 text-3xl font-bold font-primary">Book Detail</h1>

//         <SwitchButton />
//       </div>
//       <div className="flex">
//         <div className="w-9/12 gap-5 px-5">
//           <div className="mt-10 ">
//             <label
//               htmlFor="default"
//               className="block mb-2 text-lg font-medium text-gray-900"
//             >
//               Title
//             </label>
//             <Input
//               inputSize="lg"
//               className="w-full font-bold border"
//               type="text"
//               id="text"
//               placeholder="Book Title"
//             />
//           </div>
//           <div className="mt-5">
//             <label
//               htmlFor="default"
//               className="block mb-2 text-lg font-medium text-gray-900"
//             >
//               Category
//             </label>
//             <CustomDropdown />
//           </div>
//           <div className="mt-5">
//             <div className="flex items-center bg-gray-100">
//               <div className="w-full bg-white rounded shadow-md">
//                 <label
//                   htmlFor="default"
//                   className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
//                 >
//                   Keywords
//                 </label>
//                 <TagInput
//                   placeholder="Enter a tag"
//                   tags={tags}
//                   setTags={setTags}
//                   className="border-gray-300"
//                 />
//                 {/* <div className="mt-4">
//                   <h2 className="text-lg font-semibold">Tags:</h2>
//                   <ul className="list-disc list-inside">
//                     {tags.map((tag, index) => (
//                       <li key={index}>{tag}</li>
//                     ))}
//                   </ul>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//           <div className="w-full mt-5 mb-5 border">
//             <label
//               htmlFor="default"
//               className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
//             >
//               Content
//             </label>
//             <Toolbar />
//           </div>
//           <Button variant="default" className="ml-auto ">
//             Save
//           </Button>
//         </div>

//         <div className="flex flex-col w-3/12 pl-5 border-l border-indigo-300/50 ">
//           <div className="flex mx-auto flex-row-3 gap-28 font-primary">
//             <div className="text-xs font-medium text-center">
//               <BookImagePreview />
//             </div>
//           </div>
//         </div>

//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default ChildBookdetail;

// // // src/App.tsx
// // import React, { useState } from "react";
// // import TagInput from "./components/TagInput";
// // import "./index.css";

// // const App: React.FC = () => {
// //   const [tags, setTags] = useState<string[]>([]);

// //   return (
// //     <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
// //       <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
// //         <h1 className="mb-4 text-2xl font-bold">Tag Input Component</h1>
// //         <TagInput
// //           placeholder="Enter a tag"
// //           tags={tags}
// //           setTags={setTags}
// //           className="border-gray-300"
// //         />
// //         <div className="mt-4">
// //           <h2 className="text-lg font-semibold">Tags:</h2>
// //           <ul className="list-disc list-inside">
// //             {tags.map((tag, index) => (
// //               <li key={index}>{tag}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;

// src/components/ChildBookdetail.tsx
// src/components/ChildBookdetail.tsx
import { Outlet } from "react-router-dom";
import SwitchButton from "./SwitchButton";

import { Input } from "./ui/input";
import CustomDropdown from "./customDropDown";
// import Toolbar from "./Toolbar";
import { useState } from "react";
import TagInput from "./TagForm"; // Corrected import
import { Button } from "./ui/button";
import BookImagePreview from "./BookImagePreview";

const ChildBookdetail: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("FINANCIAL FREEDOM");

  return (
    <div className="flex flex-col w-4/5 h-auto px-3 my-5">
      <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50">
        <h1 className="mx-5 text-3xl font-bold font-primary">Book Detail</h1>
        <SwitchButton />
      </div>
      <div className="flex">
        <div className="w-9/12 gap-5 px-5">
          <div className="mt-10">
            <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Title
            </label>
            <Input
              inputSize="lg"
              className="w-full font-bold border"
              type="text"
              id="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Category
            </label>
            <CustomDropdown />
          </div>
          <div className="mt-5">
            <div className="flex items-center bg-gray-100">
              <div className="w-full bg-white rounded shadow-md">
                <label
                  htmlFor="default"
                  className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
                >
                  Keywords
                </label>
                <TagInput
                  placeholder="Enter a tag"
                  tags={tags}
                  setTags={setTags}
                  className="border-gray-300"
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-5 mb-5 border">
            <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
            >
              Content
            </label>
            {/* <Toolbar /> */}
          </div>
          <Button variant="default" className="ml-auto">
            Save
          </Button>
        </div>
        <div className="flex flex-col w-3/12 pl-5 border-l border-indigo-300/50 ">
          <div className="flex mx-auto flex-row-3 gap-28 font-primary">
            <div className="text-xs font-medium text-center">
              <BookImagePreview title={title} />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ChildBookdetail;

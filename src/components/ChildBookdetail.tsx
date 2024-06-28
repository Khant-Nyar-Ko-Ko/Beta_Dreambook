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

// import { Outlet } from "react-router-dom";
// import SwitchButton from "./SwitchButton";

// import { Input } from "./ui/input";
// import CustomDropdown from "./customDropDown";
// // import Toolbar from "./Toolbar";
// import { useEffect, useState } from "react";
// import TagInput from "./TagForm"; // Corrected import
// import { Button } from "./ui/button";
// import BookImagePreview from "./BookImagePreview";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteBook,
  useSingleBook,
  useUpdateBook,
} from "@/hooks/useBookApi";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFetchCategories } from "@/hooks/useCategoryApi";
import { X } from "lucide-react";
import Card from "./Card";
import Toolbar from "./Toolbar";
import { getToken } from "@/service/authService";
import { BookDataType } from "@/utils/type";

const ChildBookdetail: React.FC = () => {
  const { bookId } = useParams();

  const {
    data: singleBook,
    isLoading,
    isError,
    refetch,
  } = useSingleBook(bookId!);
  // console.log(singleBook);
  const { data: categories } = useFetchCategories();
  const mutationUpdateBook = useUpdateBook(bookId!);

  const mutationDeleteBook = useDeleteBook();

  const navigator = useNavigate();

  // const [bookKeywords, setBookKeywords] = useState<string[]>([]);
  // const [bookDescription, setBookDescription] = useState("");
  // const [bookCoverImg, setBookCoverImg] = useState("");
  // const [bookStatus, setBookStatus] = useState("");

  // useEffect(() => {
  //   if (!isLoading && singleBook) {
  //     setBookTitle(singleBook.title);
  //     setBookKeywords(singleBook.keywords);
  //     setBookDescription(singleBook.description);
  //     setBookCoverImg(singleBook.coverImg);
  //     setBookStatus(singleBook.status);
  //   }
  // }, [isLoading, singleBook]);

  // const bookDescription = stripHtml(`${singleBook?.description}`);
  // const bookTitle = singleBook?.title;
  // const bookKeywords = singleBook?.keywords;
  // const bookDescription = singleBook?.description;
  // const bookCoverImg = singleBook?.coverImg;
  // const bookStatus = `${singleBook?.status}`;
  const [isDraft, setIsDraft] = useState(true);
  const [inputKeyword, setInputKeyword] = useState("");
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null | File
  >(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const schema = z.object({
    title: z.string().min(1, { message: "you need to fill title" }),
    description: z.string(),
    categoryId: z.string().min(1, { message: "you need to choose category" }),
    status: z.string(),
    keywords: z
      .array(z.string())
      .min(1, { message: "you need to fill at least one keyword" }),
    coverImg: z.union([
      z.instanceof(File),
      z.string().min(1, "Image is required"),
    ]),
  });
  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    reset,
    control,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!isLoading && singleBook) {
      reset({
        title: singleBook.title,
        keywords: singleBook.keywords,
        categoryId: `${singleBook.category.id}`,
        description: singleBook.description,
        coverImg: singleBook.coverImg,
        status: singleBook.status,
      });
      if (singleBook.coverImg) {
        setImagePreview(singleBook.coverImg);
      }
    }
  }, [isLoading, singleBook, reset]);

  const keywords = watch("keywords");
  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputKeyword.trim() && !keywords.includes(inputKeyword.trim())) {
        setValue("keywords", [...keywords, inputKeyword.trim()]);
        trigger("keywords");
        setInputKeyword("");
      }
    }
  };

  const handleDelete = (K: string) => {
    const newKeywords = keywords?.filter((k) => k !== K);
    setValue("keywords", [...newKeywords]);
  };

  const status = watch("status");

  const formerImage = watch("coverImg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue("coverImg", file);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(formerImage);
      setValue("coverImg", "");
    }
  };

  const handleDraft = () => {
    setValue("status", "true");
    setIsDraft(true);
  };

  const handlePublic = () => {
    setValue("status", "false");
    setIsDraft(false);
  };

  const onSubmit: SubmitHandler<BookDataType> = (data) => {
    console.log(data);
    mutationUpdateBook.mutate(data);
  };

  useEffect(() => {
    const handleSuccess = async () => {
      if (mutationUpdateBook.isSuccess && getToken()) {
        const authToken = getToken();
        const bookId = mutationUpdateBook.data?.id;
        if (authToken) {
          navigator(`/bookdetail/${bookId}/childBookdetail`);
        }
      }
    };
    if (mutationUpdateBook.isSuccess) {
      handleSuccess();
    }
  }, [
    mutationUpdateBook.isSuccess,
    navigator,
    mutationUpdateBook.data?.id,
    refetch,
  ]);

  const deleteBook = (bookId: string) => {
    console.log(bookId);
    mutationDeleteBook.mutate(bookId);
    alert("book deleted");
    // navigator("/bookcrafting");
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between px-10 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold ">Book Detail</h1>
          <div className="flex justify-center items-center w-[140px] bg-gray-100 py-[4px] gap-x-3 rounded">
            <button
              className={`w-[60px] rounded ${
                isDraft ? "bg-yellow-400 text-white" : " text-gray-500"
              }`}
              type="button"
              onClick={handleDraft}
            >
              Draft
            </button>
            <button
              className={`w-[60px] rounded ${
                isDraft ? "text-gray-500" : "bg-green-400 text-white"
              }`}
              type="button"
              onClick={handlePublic}
            >
              Public
            </button>
            <input
              value={status}
              type="text"
              className="hidden"
              {...register("status")}
            />
          </div>
        </div>

        <div className="flex justify-between px-10 py-5">
          <div className=" w-[550px] ">
            <div className="mb-3">
              <p className="mb-1 text-lg font-semibold ">Title</p>
              <input
                className="w-full p-1 font-semibold border border-gray-300 rounded outline-none cursor-pointer "
                type="text"
                placeholder="title"
                {...register("title")}
                disabled={!isEditMode}
              />
              <p className="text-red-500">{errors.title?.message}</p>
            </div>
            <div className="mb-3">
              <p className="mb-1 text-lg font-semibold">Category</p>
              <select
                className="w-full p-1 border border-gray-200 rounded cursor-pointer"
                {...register("categoryId")}
                disabled={!isEditMode}
              >
                <option value={`${singleBook?.category.id}`}>
                  {singleBook && singleBook.category.title}
                </option>
                {categories?.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
              <p className="text-red-500">{errors.categoryId?.message}</p>
            </div>
            <div className="mb-3">
              <p className="mb-1 text-lg font-semibold">Keywords</p>
              <input
                className="w-full p-1 border border-gray-200 rounded-lg outline-none cursor-pointer"
                value={inputKeyword}
                type="text"
                onChange={(e) => setInputKeyword(e.target.value)}
                placeholder="keywords"
                onKeyDown={handleAddKeyword}
                disabled={!isEditMode}
              />
              <p className="text-red-500">{errors.keywords?.message}</p>

              <div className="flex items-center my-2 gap-x-3">
                {keywords?.map((k, i) => (
                  <div
                    key={i}
                    className="flex items-center p-1 bg-gray-200 rounded gap-x-1"
                  >
                    <p>{k}</p>
                    {!isEditMode ? (
                      <X className="cursor-pointer " />
                    ) : (
                      <X
                        className="cursor-pointer "
                        onClick={() => handleDelete(k)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <p className="mb-1 text-lg font-semibold">Description</p>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Toolbar
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
              <p className="text-red-500">{errors.description?.message}</p>
            </div>

            <div className="flex items-center justify-end gap-x-3">
              <button
                type="button"
                onClick={() => deleteBook(bookId as string)}
                className="text-red-500"
              >
                Delete
              </button>
              {/* <button type="button" onClick={() => setIsEditMode(!isEditMode)}>
                edit
              </button> */}
              {/* <button type="submit">save</button> */}
              <button
                type={isEditMode ? "button" : "submit"}
                onClick={() => setIsEditMode(!isEditMode)}
                className="w-[80px] py-[2px] text-white bg-default rounded"
              >
                {isEditMode ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="border border-gray-200"></div>
          <div className="flex flex-col items-center gap-y-5">
            <div>
              <div
                className="cursor-pointer flex flex-col justify-center items-center w-[200px] h-[300px] border-2 border-gray-200 border-dotted rounded-lg py-5 px-10"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <img src={imagePreview as string} className="object-cover" />
              </div>
            </div>
            <Controller
              name="coverImg"
              control={control}
              render={({ field }) => (
                <input
                  disabled={!isEditMode}
                  id="fileInput"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                    handleImageChange(e);
                  }}
                />
              )}
            />

            <Card
              id={1}
              image={singleBook?.coverImg}
              title={singleBook?.title}
              categorylogo={singleBook?.category.icon}
              categorytitle={singleBook?.category.title}
              author="Dr. Phil McGraw"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChildBookdetail;

// <div className="flex flex-col w-4/5 h-auto px-3 my-5">
//   <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50">
//     <h1 className="mx-5 text-3xl font-bold font-primary">Book Detail</h1>
//     <SwitchButton />
//   </div>
//   <div className="flex">
//     <div className="w-9/12 gap-5 px-5">
//       <div className="mt-10">
//         <label
//           htmlFor="default"
//           className="block mb-2 text-lg font-medium text-gray-900"
//         >
//           Title
//         </label>
//         <Input
//           inputSize="lg"
//           className="w-full font-bold border"
//           type="text"
//           id="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Book Title"
//         />
//       </div>
//       <div className="mt-5">
//         <label
//           htmlFor="default"
//           className="block mb-2 text-lg font-medium text-gray-900"
//         >
//           Category
//         </label>
//         <CustomDropdown />
//       </div>
//       <div className="mt-5">
//         <div className="flex items-center bg-gray-100">
//           <div className="w-full bg-white rounded shadow-md">
//             <label
//               htmlFor="default"
//               className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
//             >
//               Keywords
//             </label>
//             <TagInput
//               placeholder="Enter a tag"
//               tags={tags}
//               setTags={setTags}
//               className="border-gray-300"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="w-full mt-5 mb-5 border">
//         <label
//           htmlFor="default"
//           className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
//         >
//           Content
//         </label>
//         {/* <Toolbar /> */}
//       </div>
//       <Button variant="default" className="ml-auto">
//         Save
//       </Button>
//     </div>
//     <div className="flex flex-col w-3/12 pl-5 border-l border-indigo-300/50 ">
//       <div className="flex mx-auto flex-row-3 gap-28 font-primary">
//         <div className="text-xs font-medium text-center">
//           <BookImagePreview title={title} />
//         </div>
//       </div>
//     </div>
//     <Outlet />
//   </div>
// </div>

// const schema = z.object({
//   title: z
//     .string()
//     // .min(1, { message: "you need to fill title" })
//     .optional(),
//   description: z.string().optional(),
//   categoryId: z
//     .string()
//     // .min(1, { message: "you need to choose category" })
//     .optional(),
//   status: z.string().optional(),
//   keywords: z
//     .array(z.string())
//     // .min(1, { message: "you need to fill at least one keyword" })
//     .optional(),
//   coverImg: z.union([
//     z.instanceof(File),
//     z
//       .string()
//       // .min(1, "Image is required")
//       .optional(),
//   ]),
// });


import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFetchCategories } from "@/hooks/useCategoryApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useCreateBook } from "@/hooks/useBookApi";
// import { BookDataType } from "@/utils/type";
import { getToken } from "@/service/authService";
import Toolbar from "@/components/Toolbar";
import defaultImage from "../../assets/images/bookCrafting/bookImg.png";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { Loader2 } from "lucide-react";

const BookCraftingPage = () => {
  const bookCreateMutation = useCreateBook();
  const navigator = useNavigate();

  const schema = z.object({
    title: z.string().min(4, { message: "you need to fill title" }),
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

  const { data: categories } = useFetchCategories();

  type Schema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { isValid, errors },
    trigger,
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      keywords: [],
      status: "true",
      coverImg: "",
    },
  });

  const [inputValue, setInputValue] = useState("");

  const keywords = watch("keywords");
  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
        setValue("keywords", [...keywords, inputValue.trim()]);
        trigger("keywords");
        setInputValue("");
      }
    }
  };

  const handleDelete = (K: string) => {
    const newKeywords = keywords?.filter((k) => k !== K);
    setValue("keywords", [...newKeywords]);
  };

  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    defaultImage
  );

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
      setImagePreview(defaultImage);
      setValue("coverImg", "");
    }
  };

  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log("click");
    console.log(data);

    bookCreateMutation.mutate(data);

    reset();
  };

  useEffect(() => {
    if (bookCreateMutation.isSuccess) {
      getToken();
    }
  }, [bookCreateMutation.isSuccess]);

  useEffect(() => {
    if (bookCreateMutation.isError) {
      alert("Error");
    }
  }, [bookCreateMutation.isError]);


  bookCreateMutation.isSuccess && navigator("/bookdetail");

  return (
    <div className="p-[30px]">
      <div className="flex items-center mb-10 gap-x-5">
        <button
          className="flex items-center gap-x-2 text-default"
          onClick={() => navigator("/")}
        >
          <IoMdArrowBack />
          Back
        </button>
        <h1 className="text-2xl font-bold">Creating A New Book</h1>
      </div>

      <form
        className="flex items-start px-10 gap-x-16"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className="hidden"
            type="text"
            {...register("status")}
            value={"true"}
            readOnly
          />

          <div>
            <div
              className="flex flex-col justify-center items-center w-[200px] h-[300px] border-2 border-gray-200 border-dotted rounded-lg py-5 px-10"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <img src={imagePreview as string} className="object-cover" />
              {imagePreview === defaultImage ? (
                <div className="text-[10px] text-gray-300 text-center">
                  <p>Drop your images here or browse JPG, JPEG or PNG</p>
                  <p>The size must be 123x123 px</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <Controller
            name="coverImg"
            control={control}
            render={({ field }) => (
              <input
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

          <p className="text-red-500">{errors.coverImg?.message}</p>
          <p className="my-2 font-semibold text-center text-default">
            Select Book Cover
          </p>
        </div>

        <div className="flex flex-col gap-y-5">
          <div>
            <p className="mb-2 font-semibold">Title</p>
            <input
              className="w-full p-1 border border-gray-200 rounded-lg outline-none"
              type="text"
              {...register("title")}
              placeholder="Book Title"
            />
            <p className="text-red-500">{errors.title?.message}</p>
          </div>

          <div>
            <p className="mb-2 font-semibold">Category</p>
            <select
              className="w-full p-1 border border-gray-200 rounded-lg outline-none"
              {...register("categoryId")}
            >
              <option value="">Select Category</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <p className="text-red-500">{errors.categoryId?.message}</p>
          </div>

          <div>
            <p className="mb-1 font-semibold">Keywords</p>
            <input
              className="w-full p-1 border border-gray-200 rounded-lg outline-none"
              value={inputValue}
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="keywords"
              onKeyDown={handleAddKeyword}
            />
            <p className="text-red-500">{errors.keywords?.message}</p>

            <div className="flex items-center my-2 gap-x-3">
              {keywords?.map((k, i) => (
                <div
                  key={i}
                  className="flex items-center p-1 bg-gray-200 rounded gap-x-1"
                >
                  <p>{k}</p>
                  <p
                    className="hover:cursor-pointer"
                    onClick={() => handleDelete(k)}
                  >
                    x
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 font-semibold">Description</p>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Toolbar value={field.value || ""} onChange={field.onChange} />
              )}
            />
            <p className="text-red-500">{errors.description?.message}</p>
          </div>

          <button
            type="submit"
            className={`py-2 rounded text-white ${
              isValid || bookCreateMutation.isPending
                ? "bg-default"
                : "bg-gray-400 "
            }`}
          >
            <div className="flex items-center justify-center gap-x-3">
              <Loader2
                className={
                  bookCreateMutation.isPending ? "block animate-spin" : "hidden"
                }
              />
              Create Now
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookCraftingPage;

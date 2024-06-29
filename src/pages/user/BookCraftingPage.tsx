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
import { Loader2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BookCraftingPage = () => {
  const bookCreateMutation = useCreateBook();
  const navigate = useNavigate();

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
    bookId: z.string().optional(),
  });

  const { data: categories } = useFetchCategories();
  console.log(categories);
  

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
    const bookData = { ...data, bookId: null };
    bookCreateMutation.mutate(bookData, {
      onSuccess: (createdBook) => {
        // Assuming the createdBook contains the book ID
        navigate(`/bookdetail/${createdBook.id}`);
        reset();
      },
    });

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


  return (
    <div className="md:p-[30px] select-none py-5">
      <div className="flex items-center mb-10 gap-x-5 font-primary">
        <BackButton backPath="/"/>
        <h1 className="text-2xl font-bold">Creating A New Book</h1>
      </div>

      <form
        className="flex flex-col md:flex-row items-start px-10 pb-10 gap-x-16 w-screen md:w-[3/5]"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input
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
            <label htmlFor="title" className="mb-2 font-semibold">Title</label>
            <Input
            id="title"
              className=" w-[300px] md:w-full p-1 border border-gray-200 rounded-lg outline-none w"
              type="text"
              {...register("title")}
              placeholder="Book Title"
            />
            <p className="text-sm text-red-500">{errors.title?.message}</p>
          </div>

          <div>
            <label htmlFor="category" className="mb-2 font-semibold">Category</label>
            <select
            id="category"
              className="w-[300px] md:w-full p-1 py-2 border border-gray-200 rounded-lg outline-none"
              {...register("categoryId")}
            >
              <option value="" className="text-sm w-[300px] md:w-full">Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <p className="text-sm text-red-500">{errors.categoryId?.message}</p>
          </div>

          <div>
            <label htmlFor="keywords" className="mb-1 font-semibold">Keywords</label>
            <Input
            id="keywords"
              className="w-[300px] md:w-full p-1 border border-gray-200 rounded-lg outline-none"
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

          <div className=" w-[300px] md:w-[350px]">
            <p className="mb-1 font-semibold">Description</p>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Toolbar value={field.value || ""} onChange={field.onChange} />
              )}
            />
            <p className="text-sm text-red-500">{errors.description?.message}</p>
          </div>

          <Button
            type="submit"
            className={`py-2 w-[300px] md:w-[350px] rounded text-white ${
              isValid || bookCreateMutation.isPending
                ? "bg-default"
                : "bg-gray-400 "
            }`}
          >
            <div className="flex items-center justify-center gap-x-3 font-primary">
              <Loader2
                className={
                  bookCreateMutation.isPending ? "block animate-spin" : "hidden"
                }
              />
              Create Now
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookCraftingPage;

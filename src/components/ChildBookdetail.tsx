import { Outlet, useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import { Input } from "./ui/input";
import CustomDropdown from "./customDropDown";
import { useState } from "react";
import TagInput from "./TagForm";
import { Button } from "./ui/button";
import BookImagePreview from "./BookImagePreview";
import { useFetchSingleBook, useUpdateBook } from "@/hooks/useBookApi";
import Toolbar from "./Toolbar";
import Loading from "./Loading";

const ChildBookdetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: createdBook } = useFetchSingleBook(slug ?? "");
  const bookUpdateMutation = useUpdateBook();
  console.log(bookUpdateMutation);
  const [isEdit, setIsEdit] = useState(true);

  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>(
    createdBook?.description
  );

  if (!createdBook) {
    return <Loading />;
  }

  console.log(createdBook);

  return (
    <div className="flex flex-col w-4/5 h-auto px-3 py-4">
      <div className="flex items-center justify-between w-full pb-2 text-center border-b border-indigo-300/50">
        <h1 className="mx-5 text-3xl font-bold font-primary">Book Detail</h1>
        <SwitchButton />
      </div>
      <div className="flex">
        <div className="w-9/12 gap-3 px-5">
          <div className="mt-5">
            <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Title
            </label>
            <Input
              inputSize="lg"
              className="w-full font-bold border select-none"
              type="text"
              id="text"
              defaultValue={createdBook.title}
              placeholder="Book Title"
              {...(!isEdit? {} : { disabled: true })}
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Category
            </label>
            <CustomDropdown categoryId={createdBook?.categoryId} isDisabled={isEdit}  />
          </div>
          <div className="mt-5">
            <div className="flex items-center bg-gray-100">
              <div className="w-full bg-white rounded">
                <TagInput
                  placeholder="Enter a tag"
                  initialTags={createdBook.keywords}
                  tags={tags}
                  setTags={setTags}
                  className="border-gray-300"
                  isDisabled={isEdit}
                />
              </div>
            </div>
          </div>
          <div className="my-5">
            <label
              htmlFor="default"
              className="block mb-2 text-lg font-medium text-gray-900 rounded-md"
            >
              Description
            </label>
            <div className="w-full mt-5 mb-5 border">
              <Toolbar value={description} onChange={setDescription}  isDisabled={isEdit}/>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            {isEdit ? (
              <>
                <Button variant="white" className="text-red-600">
                  Delete
                </Button>
                <Button variant="default" onClick={() => setIsEdit(!isEdit)}>Edit</Button>
              </>
            ) : (
              <>
                <Button variant="white" className="text-gray-600" onClick={() => setIsEdit(!isEdit)}>
                  Cancel
                </Button>
                <Button variant="default" >Save</Button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col border-l">
          <div className="text-xs font-medium text-center">
            <BookImagePreview
              title={createdBook?.title}
              coverImg={createdBook?.coverImg}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ChildBookdetail;

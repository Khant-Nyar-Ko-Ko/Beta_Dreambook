import { CheckboxWithText } from "../CheckboxWithText";

const LibCategory = () => {

  return (
    <div className="flex flex-col items-center justify-start w-1/4 h-auto gap-5 py-10 bg-blue-50">
        <h6 className="text-lg font-bold text-black">Categories</h6>
           <CheckboxWithText/>
    </div>

  )
}

export default LibCategory
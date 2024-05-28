import { CheckboxWithText } from "../CheckboxWithText";

const LibCategory = () => {

  return (
    <div className="flex-col items-center justify-start hidden w-1/4 h-auto gap-5 py-10  md:flex bg-blue-50">
        <h6 className="text-lg font-bold text-black">Categories</h6>
           <CheckboxWithText/>
    </div>

  )
}

export default LibCategory
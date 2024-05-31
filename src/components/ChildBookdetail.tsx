import { Outlet } from "react-router-dom";
import SwitchButton from "./SwitchButton";

const ChildBookdetail = () => {
  return (
    <div className="flex flex-col w-4/5 h-auto px-3 my-5">
      <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50">
        <h1 className="mx-5 text-3xl font-bold font-primary">Book Detail</h1>

        <SwitchButton />
      </div>

      <Outlet />
    </div>
  );
};

export default ChildBookdetail;

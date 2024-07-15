import React from "react";
import { IoClose } from "react-icons/io5";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CategoryDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
    className={`fixed inset-0 z-50 flex items-end transition-opacity ${
      isOpen ? "visible opacity-100" : "invisible opacity-0"
    }`}
  >
    <div
      className={`fixed inset-0 bg-black transition-opacity ${
        isOpen ? "opacity-50" : "opacity-0"
      }`}
      onClick={onClose}
    ></div>
    <div
      className={`bg-white dark:bg-darkMode1 w-full p-4 transition-transform transform ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-end">
        <button onClick={onClose} className="text-xl">
          <IoClose color="#3A7AD5" />
        </button>
      </div>
      {children}
    </div>
  </div>
  )
}

export default CategoryDrawer
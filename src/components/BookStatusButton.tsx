import React from "react"
import SwitchButton from "./SwitchButton"


interface HeaderProps {
    text : string
}

const BookStatusButton: React.FC<HeaderProps> = ({text}) => {

  return (
    <div className="flex items-center justify-between px-5 py-3 text-center bg-white border-b dark:bg-darkMode1 border-indigo-300/50">
        <h1 className="mx-5 text-3xl font-bold text-black font-primary dark:text-white">
          {text}
        </h1>
        <SwitchButton />
      </div>
  )
}

export default BookStatusButton
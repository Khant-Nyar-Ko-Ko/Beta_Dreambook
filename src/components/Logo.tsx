import logo from "../assets/images/Login/Vector 2.svg";

const Logo = () => {
  return (
    <div className=" mb-7">
    <div className="flex gap-4 w-[370px]">
      <img src={logo} className="w-20 h-16 " alt="" />
      <div className="w-[350px] flex flex-col gap-1">
        <h3 className="text-xl font-bold text-white font-primary">
          Dream Book
        </h3>
        <p className="text-sm text-white font-primary">
          Book Reading & Publishing Platform
        </p>
      </div>
    </div>
  </div>
  )
}

export default Logo
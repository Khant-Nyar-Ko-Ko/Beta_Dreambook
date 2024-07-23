import { NavLink } from "react-router-dom"
import background from "../../assets/images/AuthBgImage.avif";
import notfound from "../../assets/images/404-error.png";

const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen text-white bg-gray-900">
    <img src={background} className="absolute top-0 left-0 object-cover w-full h-full opacity-50" alt="Background" />
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
    <div className="relative z-10 flex flex-col items-center gap-4 p-4 text-center font-primary">
      <img src={notfound} className="w-[200px]" alt="" />
      <h1 className="font-extrabold text-9xl">404</h1>
      <h2 className="text-4xl font-semibold">Page Not Found</h2>
      <p className="text-lg">Sorry, the page you're looking for doesn't exist.</p>
      <NavLink to="/" className="mt-4 text-default hover:underline">
        Go back to Home
      </NavLink>
    </div>
  </div>
  )
}

export default NotFound;
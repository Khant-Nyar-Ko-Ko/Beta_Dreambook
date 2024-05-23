import { Button } from "./ui/button"
import landing1 from "../assets/images/landing/landingphoto1.png";
import applestore from "../assets/images/landing/App Store.png";
import playstore from "../assets/images/landing/Play Store.png";
import bg1 from "../assets/images/landing/bg1.png";
import bg2 from "../assets/images/landing/bg2.png";
import pot from "../assets/images/landing/daisypot.png";

const Hero = () => {
  return (
    <div className="relative">
    <img src={bg1} className="absolute top-0 left-0 w-[120px]" alt="bg1" />
    <img
      src={bg2}
      className="absolute z-0 bottom-0 right-1 w-[600px]"
      alt="bg2"
    />
    <img
      src={pot}
      className="absolute z-0 bottom-0 right-0 w-[200px]"
      alt="bg2"
    />
    <div className="flex w-screen px-[150px] h-auto bg-primarybg py-5">
      <div className="z-10 flex flex-col items-center justify-center w-1/2 gap-5">
        <div className="flex flex-col gap-8">
          <div className="text-5xl font-semibold font-primary">
            <h2>Discover</h2>
            <h2>Magic of Books</h2>
          </div>
          <p className=" w-[450px] font-primary">
            "Unlock worlds, one page at a time: Dive into the stories that
            shape us. Welcome to a sanctuary for book lovers, where words
            ignite passions and journeys never end."
          </p>
          <Button className="py-5 font-semibold text-center w-60 h-14">
            Explore Now
          </Button>
          <div className="flex flex-col gap-3 ">
            <p className="text-sm uppercase text-light">Try on mobile</p>
            <div className="flex gap-5">
              <img src={applestore} className="w-40 " alt="applestore" />
              <img src={playstore} className="w-40 " alt="applestore" />
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 flex flex-col items-center justify-center w-1/2 gap-5 my-20">
        <img className="h-auto w-[500px]" src={landing1} alt="" />
        <p className=" font-primary">Most Popular Books This Week</p>
      </div>
    </div>
  </div>
  )
}

export default Hero
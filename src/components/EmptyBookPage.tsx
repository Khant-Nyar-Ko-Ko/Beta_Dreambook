
const EmptyBookPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] mt-20 text-center md:mt-0">
        <iframe
          src="https://lottie.host/embed/8866455b-434f-412d-863b-334f6c5c5724/EzyvqFxRUM.json"
          className="w-32 h-32"
          title="Animation"
        ></iframe>
        <p className="mt-3 text-center text-black opacity-50 font-primary dark:text-white">
          "Discover literary treasures: Explore our curated book lists
          collection today."
        </p>
      </div>
  )
}

export default EmptyBookPage
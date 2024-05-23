
const cardData = [
    {
        id: 1,
        heading: "About Us",
        subheading: "Our Story",
        desc: "Dedicated to Spreding the love of Literature"
    },
    {
        id: 2,
        heading: "Feactured",
        subheading: "Explore",
        desc: " Discover Your Favorite Books from Everywhere and at anytime"
    },
    {
        id: 3,
        heading: "Visit Now",
        subheading: "Browse",
        desc: "Experience the Magic of Books"
    },
]

const About = () => {
  return (
    <div className="flex justify-center gap-5 px-10 py-10">
        {cardData.map(({id, heading, subheading, desc}) => (
            <div key={id} className="flex flex-col h-auto gap-5 px-5 pt-5 pb-10 rounded-lg bg-default w-[300px]">
            <p className="text-white font-primary">{heading}</p>
            <div className="flex flex-col">
              <p className="text-[10px] text-white font-primary">{subheading}</p>
              <p className="text-[12px] text-white font-primary">
                {desc}
              </p>
            </div>
          </div>
        ))}
  </div>
  )
}

export default About
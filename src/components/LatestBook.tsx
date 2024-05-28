import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LatestBookCard from "./LatestBookCard";

const LatestBook = () => {
  return (
    <><div className="flex justify-center mx-10 md:mx-4 my-10 md:px-[120px]">
    <Swiper
      spaceBetween={20}
      slidesPerView={1.4}
      breakpoints={{
        768: {
          slidesPerView: 1.4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
    >
      <SwiperSlide>
        <LatestBookCard />
      </SwiperSlide>
      <SwiperSlide>
        <LatestBookCard />
      </SwiperSlide>
      <SwiperSlide>
        <LatestBookCard />
      </SwiperSlide>
      <SwiperSlide>
        <LatestBookCard />
      </SwiperSlide>
      <SwiperSlide>
        <LatestBookCard />
      </SwiperSlide>
      <SwiperSlide>
        <LatestBookCard />
      </SwiperSlide>
      <SwiperSlide>
        <LatestBookCard />
      </SwiperSlide>
      <SwiperSlide>
        <LatestBookCard />
      </SwiperSlide>
    </Swiper>
  </div></>
  )
}

export default LatestBook
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LatestBookCard from "./LatestBookCard";

const LatestBook = () => {
  return (
    <><div className="flex justify-center gap-5 my-10">
    <Swiper
      spaceBetween={20}
      slidesPerView={1.5}
      breakpoints={{
        768: {
          slidesPerView: 1.5,
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
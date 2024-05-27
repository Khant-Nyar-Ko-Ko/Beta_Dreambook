import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PopularBookCard from "./PopularBookCard";

const PopularBook = () => {
  return (
    <>
      <h4 className="text-lg text-center  md:text-2xl font-primary">Popular Books</h4>
      <div className="flex justify-center gap-5 my-10">
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
            <PopularBookCard />
          </SwiperSlide>
          <SwiperSlide>
            <PopularBookCard />
          </SwiperSlide>
          <SwiperSlide>
            <PopularBookCard />
          </SwiperSlide>
          <SwiperSlide>
            <PopularBookCard />
          </SwiperSlide>
          <SwiperSlide>
            <PopularBookCard />
          </SwiperSlide>
          <SwiperSlide>
            <PopularBookCard />
          </SwiperSlide>
          <SwiperSlide>
            <PopularBookCard />
          </SwiperSlide>
          <SwiperSlide>
            <PopularBookCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default PopularBook;

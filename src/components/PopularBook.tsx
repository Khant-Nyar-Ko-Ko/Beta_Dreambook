import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PopularBookCard from "./PopularBookCard";

const PopularBook = () => {
  return (
    <>
      <h4 className="text-lg text-center md:text-2xl font-primary">Popular Books</h4>
      <div className="flex justify-center mx-10 my-10 md:px-[120px]">
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

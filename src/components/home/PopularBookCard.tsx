/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchPopularBook } from "@/hooks/useBookApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import CardLoading from "../Loading/CardLoading";
import Card from "../tools/Card";

const PopularBookCard = () => {
  const { data: popularBook, error, isLoading } = useFetchPopularBook();

  if (isLoading) {
    return <CardLoading />;
  }

  if (error) {
    return <CardLoading />;
  }

  if (!popularBook || popularBook.length === 0) {
    return <CardLoading />;
  }

  return (
    <Swiper
      modules={[ Mousewheel]}
      spaceBetween={30}
      loop={true}
      slidesPerView={1.4}
      mousewheel={true}
      direction={"horizontal"}
      breakpoints={{
        768: {
          slidesPerView: 1.4,
        },
        1024: {
          slidesPerView: 4.7,
        },
      }}
    >
      {popularBook.map(
        ({
          id,
          title,
          coverImg,
          category,
          user,
          slug,
          favouriteCount,
          chapterNum,
        }: {
          id: any;
          title: string;
          coverImg: string;
          category: any;
          user: any;
          slug: string;
          favouriteCount: number;
          chapterNum: number;
        }) => {
          const { name, profileImg, id: authorId } = user;

          return (
            <SwiperSlide key={id}>
              <Card
                key={id}
                id={id}
                slug={slug}
                title={title}
                image={coverImg}
                categorylogo={category?.icon}
                categorytitle={category?.title}
                author={name}
                authorprofile={profileImg}
                authorId={authorId}
                favouriteCount={favouriteCount}
                chapterNum={chapterNum}
              />
            </SwiperSlide>
          );
        }
      )}
    </Swiper>
  );
};

export default PopularBookCard;

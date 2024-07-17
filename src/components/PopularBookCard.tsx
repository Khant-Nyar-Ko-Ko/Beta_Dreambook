/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchPopularBook } from "@/hooks/useBookApi";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardLoading from "./Loading/CardLoading";

const PopularBookCard = () => {
  const { data: popularBook, error, isLoading } = useFetchPopularBook();

  if (isLoading) {
    return <CardLoading />;
  }

  if (error) {
    return <div>Error loading books</div>;
  }

  if (!popularBook || popularBook.length === 0) {
    return <div>No popular books available</div>;
  }

  return (
    <Swiper
      spaceBetween={30}
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
      {popularBook.map(
        ({
          id,
          title,
          coverImg,
          category,
          user,
          slug,
          favouriteCount,
          chapterNum
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

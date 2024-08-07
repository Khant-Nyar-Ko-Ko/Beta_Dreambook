/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchBooks } from "@/hooks/useBookApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import { Mousewheel } from "swiper/modules";
import CardLoading from "../Loading/CardLoading";
import Card from "../tools/Card";

const LatestBookCard = () => {
  const { data, error, isLoading } = useFetchBooks();
  const latestBook = data?.items;

  if (isLoading) {
    return <CardLoading />;
  }

  if (error) {
    return <CardLoading />;
  }

  if (!latestBook || latestBook.length === 0) {
    return <CardLoading />;
  }
  return (
    <>
      <Swiper
       modules={[ Mousewheel]}
        spaceBetween={20}
        slidesPerView={1.4}
        mousewheel={true}
        breakpoints={{
          768: {
            slidesPerView: 1.4,
          },
          1024: {
            slidesPerView: 4.7,
          },
        }}
      >
        {latestBook.map(
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
            const { name, profileImg, id : authorId } = user;
            

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
    </>
  );
};

export default LatestBookCard;

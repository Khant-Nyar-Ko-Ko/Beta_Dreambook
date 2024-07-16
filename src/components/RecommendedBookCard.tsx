/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchRecommendedBook } from "@/hooks/useBookApi";
import CardLoading from "./Loading/CardLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "./Card";

const RecommendedBookCard = () => {
    const { data: recommendedBooks, error, isLoading } = useFetchRecommendedBook();
    

    if (isLoading) {
        return <CardLoading />;
      }
    
      if (error) {
        return <div>Error loading books</div>;
      }

      if (!recommendedBooks || recommendedBooks.length === 0) {
        return <div>No Recommended books for You</div>;
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
    {recommendedBooks.map(
      ({
        id,
        title,
        coverImg,
        category,
        user,
        slug
      }: {
        id: any;
        title: string;
        coverImg: string;
        category: any;
        user: any;
        slug: string;
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
            />
          </SwiperSlide>
        );
      }
    )}
  </Swiper>
  )
}

export default RecommendedBookCard
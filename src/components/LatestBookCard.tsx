/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchBooks } from "@/hooks/useBookApi";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const LatestBookCard = () => {
  const { data, error, isLoading } = useFetchBooks();
  const latestBook = data?.items;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading books</div>;
  }

  if (!latestBook || latestBook.length === 0) {
    return <div>No popular books available</div>;
  }
  return (
     <>
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
       {latestBook.map(
         ({
           id,
           title,
           coverImg,
           category,
           user,
         }: {
           id: any;
           title: string;
           coverImg: string;
           category: any;
           user: any;
         }) => {
           const { name } = user;

           return (
             <SwiperSlide key={id}>
               <Card
                 key={id}
                 id={id}
                 title={title}
                 image={coverImg}
                 categorylogo={category?.icon}
                 categorytitle={category?.title}
                 author={name}
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

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import BookCard from "../books/BookCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi.ts";
import { Book } from "../../types/types.ts";

const Recommended = () => {
  const { data } = useFetchAllBooksQuery(undefined);
  const books = data?.books ?? [];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.slice(8, 18).map((book: Book, index: number) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommended;

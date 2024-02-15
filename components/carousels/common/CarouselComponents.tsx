// Import Swiper styles

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FreeMode, Navigation, Pagination } from "swiper";
import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { Testimonial } from "../../../types/content-types/Testimonial.type";
import TestimonialItem from "../../content-types/TestimonialItem/TestimonialItem";

interface CarousselNextButtonProps {}
interface CarousselPreviousButtonProps {}

interface CarousselProps {
  slides: Testimonial[];
  slidesPerView?: number;
  spaceBetween?: number;
  freeMode?: boolean;
  pagination?: boolean;
  className?: string;
}

const CarousselNextButton: React.FC<CarousselNextButtonProps> = () => {
  const swiper = useSwiper();
  return (
    <button className="h-9 text-2xl z-50" onClick={() => swiper.slideNext()}>
      <FiChevronRight />
    </button>
  );
};

const CarousselPreviousButton: React.FC<CarousselPreviousButtonProps> = () => {
  const swiper = useSwiper();
  return (
    <button className="h-9 text-2xl z-50" onClick={() => swiper.slidePrev()}>
      <FiChevronLeft />
    </button>
  );
};

export const Caroussel: React.FC<CarousselProps> = ({
  slides = [],
  slidesPerView = 3,
  spaceBetween = 30,
  freeMode = true,
  pagination = true,
  className = "swiper",
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      freeMode={freeMode}
      pagination={pagination}
      modules={[FreeMode, Pagination, Navigation]}
      className={className}
      onRealIndexChange={(swiper) => {
        setActiveIndex(swiper.realIndex);
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="min-h-[300px] md:min-h-[400px] h-auto"
        >
          <TestimonialItem data={slide} />
        </SwiperSlide>
      ))}

      {slides?.length > slidesPerView && (
        <div className="mx-auto mt-6 flex justify-center items-center">
          <CarousselPreviousButton />
          <span className="w-[300px]"></span>
          <CarousselNextButton />
        </div>
      )}
    </Swiper>
  );
};

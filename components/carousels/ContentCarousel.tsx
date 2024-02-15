import { Caroussel } from "./common/CarouselComponents";
import React from "react";
import { Testimonial } from "../../types/content-types/Testimonial.type";

interface ContentCarouselProps {
  slides: Testimonial[];
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({ slides }) => {
  return <Caroussel slides={slides} />;
};

export default ContentCarousel;

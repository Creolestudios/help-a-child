import React from "react";

interface IProps {
  element: HTMLDivElement | null;
  step: number;
  rightArrow: any;
  leftArrow: any;
}
export const handleHorizantalScroll = ({
  element,
  step,
  rightArrow,
  leftArrow,
}: IProps) => {
  let scrollAmount = 0;
  if (element) {
    element.scrollTo({
      left: element.scrollLeft + step,
      behavior: "smooth",
    });
    scrollAmount += Math.abs(step);
    if (element.scrollLeft === 0) {
      leftArrow.classList.remove("active");
    } else if (element.scrollLeft > 0) {
      leftArrow.classList.add("active");
    }

    if (element.scrollLeft + element.offsetWidth >= element.scrollWidth - 100) {
      rightArrow.classList.remove("active");
      element.classList.add("active");
    } else if (
      element.scrollLeft + element.offsetWidth - 100 <=
      element.scrollWidth
    ) {
      element.classList.remove("active");
      rightArrow.classList.add("active");
    }
  }
};

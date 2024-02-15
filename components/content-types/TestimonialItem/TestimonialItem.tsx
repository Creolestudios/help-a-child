import { H3, P } from "../../typography";

import React from "react";
import { Testimonial } from "../../../types/content-types/Testimonial.type";
import { parseDate } from "../../../utils/parseDate";
import { useTheme } from "styled-components";

interface TestimonialItemProps {
  data: Testimonial;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <div
      className="max-w-[100%] min-h-[300px] md:max-w-[440px] md:min-h-[400px] md:h-full text-left p-8 rounded-lg flex flex-col justify-between"
      style={{ backgroundColor: colors.tertiary.light }}
    >
      <div>
        <H3 variant="bold" color="secondary">
          {data.title}
        </H3>
        <P>{data.description}</P>
      </div>
      <span
        className="flex justify-between items-center mt-11"
        style={{ color: colors.primary.normal }}
      >
        <i>{data.author}</i>
        {data.date && (
          <i style={{ color: colors.secondary.light }}>
            Geplaatst op {parseDate(new Date(data.date))}
          </i>
        )}
      </span>
    </div>
  );
};

export default TestimonialItem;

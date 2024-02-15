import * as React from "react";
import { SVGProps } from "react";

const CheckmarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={13}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m12.216 2.198-7.46 7.94a1 1 0 0 1-.73.31 1 1 0 0 1-.73-.31l-2.48-2.63a1 1 0 1 1 1.45-1.37l1.76 1.87 6.73-7.16a1 1 0 0 1 1.42 0 1 1 0 0 1 .04 1.35Z"
      fill="#555"
    />
  </svg>
);

export default CheckmarkIcon;

import * as React from "react";
import { SVGProps } from "react";

const ImportantCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      d="M10.234 0c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10Zm1 15h-2v-2h2v2Zm0-4h-2V5h2v6Z"
      fill="#555"
    />
  </svg>
);

export default ImportantCircle;

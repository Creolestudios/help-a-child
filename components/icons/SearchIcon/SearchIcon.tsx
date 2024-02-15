import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "styled-components";

const SearchIcon = ({ color, ...props }: SVGProps<SVGSVGElement>) => {
  const { colors } = useTheme();
  let strokeColor = color;

  if (!color) {
    strokeColor = colors.secondary.light;
  }
  return (
    <svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.484 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM15.984 16.5l-3.262-3.262"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: "#150F2F" }}
      />
    </svg>
  );
};

export default SearchIcon;

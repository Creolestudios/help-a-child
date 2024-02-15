import * as React from "react";
import { useTheme } from "styled-components";
import { IconProps } from "../../../types/iconTypes";

export default function ChevronDownFilled({
  color = "info",
  fill,
  ...props
}: IconProps) {
  const { colors } = useTheme();

  return (
    <svg
      width={17}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.892 11.434a1 1 0 0 1-1.6 0L.287 2.1a1 1 0 0 1 .8-1.6h14.011a1 1 0 0 1 .8 1.6l-7.006 9.334Z"
        fill={fill || "#000"}
      />
    </svg>
  );
}

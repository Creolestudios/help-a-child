import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "styled-components";
import { IconProps } from "../../../types/iconTypes";

export default function ChevronRight({
  color = "primary",
  ...props
}: IconProps) {
  const { colors } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={38}
      fill="none"
      {...props}
    >
      <circle cx={19} cy={19} r={19} fill={colors[color].normal} />
      <path
        fill="#fff"
        d="M16.678 11.766a1.102 1.102 0 0 0-1.55 0l-.335.33a1.102 1.102 0 0 0 0 1.568l4.597 4.553a1.102 1.102 0 0 1 0 1.566l-4.598 4.553a1.102 1.102 0 0 0 0 1.567l.336.331c.43.425 1.12.425 1.55 0l6.528-6.45a1.103 1.103 0 0 0 0-1.568l-6.528-6.45Z"
      />
    </svg>
  );
}

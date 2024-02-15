import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "styled-components";
import { IconProps } from "../../../types/iconTypes";

const ShareIcon = ({ color = "tertiary", ...props }: IconProps) => {
  const { colors } = useTheme();

  return (
    <svg
      width={21}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1.927v2.05a13 13 0 0 1 12 12.95v3a1 1 0 0 1-.83 1 .467.467 0 0 1-.17 0 1 1 0 0 1-.94-.66l-1.27-3.48A10.44 10.44 0 0 0 9 9.977v1.95a1 1 0 0 1-1.64.77l-6-5a1 1 0 0 1 0-1.54l6-5a1 1 0 0 1 1.64.77Zm-2 7a1 1 0 0 1 1-1 12.45 12.45 0 0 1 10.54 5.86A11 11 0 0 0 8 5.927a1 1 0 0 1-1-1v-.87l-3.44 2.87L7 9.797v-.87Z"
        fill={colors[color].normal}
      />
    </svg>
  );
};

export default ShareIcon;

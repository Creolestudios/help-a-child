import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "styled-components";
import { IconProps } from "../../../types/iconTypes";

const MenuIcon = ({ color = "primary", ...props }: IconProps) => {
  const { colors } = useTheme();

  return (
    <svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.492 12.119h18M3.492 6.119h18M3.492 18.119h18"
        stroke={colors[color].normal}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;

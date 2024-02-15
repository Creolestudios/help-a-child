import * as React from "react";
import { useTheme } from "styled-components";
import { IconProps } from "../../../types/iconTypes";

const MoreIcon = ({ color = "secondary", ...props }: IconProps) => {
  const { colors } = useTheme();

  return (
    <svg
      width={20}
      height={7}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 .928a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm4 3a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-1 3a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm-14 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
        fill={colors[color].normal}
      />
    </svg>
  );
};

export default MoreIcon;

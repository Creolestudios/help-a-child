import React, { ReactNode } from "react";

import styled from "styled-components";
import { ColorType } from "../../../types/colorTypes";

type Props = {
  variant?: "bold" | "regular" | "light";
  color?: ColorType;
  children: ReactNode;
  style?: React.CSSProperties;
};

const BaseH6 = styled.h6<{ color: ColorType }>`
  font-size: 18px;
  line-height: 100%;
  color: ${({ theme, color }) => theme.colors[color].normal};
  font-style: normal;
  margin: 12px 0;
`;

const StyledH6Bold = styled(BaseH6)`
  font-weight: 700;
`;
const StyledH6 = styled(BaseH6)`
  font-weight: 400;
`;
const StyledH6Light = styled(BaseH6)`
  font-weight: 300;
`;

export default function H6({
  variant = "regular",
  children,
  color = "black",
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH6Bold color={color} {...rest}>
          {children}
        </StyledH6Bold>
      );
    case "regular":
      return (
        <StyledH6 color={color} {...rest}>
          {children}
        </StyledH6>
      );
    case "light":
      return (
        <StyledH6Light color={color} {...rest}>
          {children}
        </StyledH6Light>
      );

    default:
      return (
        <StyledH6 color={color} {...rest}>
          {children}
        </StyledH6>
      );
  }
}

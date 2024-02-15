import React, { ReactNode } from "react";

import styled from "styled-components";
import { ColorType } from "../../../types/colorTypes";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  variant?: "bold" | "regular" | "light";
  color?: ColorType;
  children: ReactNode;
  style?: React.CSSProperties;
};

const BaseH3 = styled.h3<{ color: ColorType }>`
  font-size: 32px;
  line-height: 120%;
  color: ${({ theme, color }) => theme.colors[color].normal};
  font-style: normal;
  margin: 12px 0;
`;

const StyledH3Bold = styled(BaseH3)`
  font-weight: 700;
`;
const StyledH3 = styled(BaseH3)`
  font-weight: 400;
`;
const StyledH3Light = styled(BaseH3)`
  font-weight: 300;
`;

export default function H3({
  variant = "regular",
  color = "black",
  children,
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH3Bold color={color} {...rest}>
          {children}
        </StyledH3Bold>
      );
    case "regular":
      return (
        <StyledH3 color={color} {...rest}>
          {children}
        </StyledH3>
      );
    case "light":
      return (
        <StyledH3Light color={color} {...rest}>
          {children}
        </StyledH3Light>
      );

    default:
      return (
        <StyledH3 color={color} {...rest}>
          {children}
        </StyledH3>
      );
  }
}

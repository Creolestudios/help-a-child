import React, { ReactNode } from "react";

import styled from "styled-components";
import { ColorType } from "../../../types/colorTypes";

type Props = {
  variant?: "bold" | "regular" | "light";
  color?: ColorType;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const BaseH4 = styled.h4<{ color: ColorType }>`
  font-size: 24px;
  line-height: 115%;
  color: ${({ theme, color }) => theme.colors[color].normal};
  font-style: normal;
  margin: 12px 0;
  font-family: "Fjalla One";
`;

const StyledH4Bold = styled(BaseH4)`
  font-weight: 700;
`;
const StyledH4 = styled(BaseH4)`
  font-weight: 400;
`;
const StyledH4Light = styled(BaseH4)`
  font-weight: 300;
`;

export default function H4({
  variant = "regular",
  children,
  color = "black",
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH4Bold color={color} {...rest}>
          {children}
        </StyledH4Bold>
      );
    case "regular":
      return (
        <StyledH4 color={color} {...rest}>
          {children}
        </StyledH4>
      );
    case "light":
      return (
        <StyledH4Light color={color} {...rest}>
          {children}
        </StyledH4Light>
      );

    default:
      return (
        <StyledH4 color={color} {...rest}>
          {children}
        </StyledH4>
      );
  }
}

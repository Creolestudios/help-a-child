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

const BaseH2 = styled.h2<{ color: ColorType }>`
  font-size: 24px;
  line-height: 120%;
  color: ${({ theme, color }) => theme.colors[color].normal};
  font-style: normal;
  margin: 12px 0;

  @media ${({ theme }) => theme.devices.tablet} {
    margin: 18px 0;
    font-size: 40px;
    line-height: 130%;
  }
`;

const StyledH2Bold = styled(BaseH2)`
  font-weight: 700;
`;
const StyledH2 = styled(BaseH2)`
  font-weight: 400;
`;
const StyledH2Light = styled(BaseH2)`
  font-weight: 300;
`;

export default function H2({
  variant = "regular",
  color = "black",
  children,
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH2Bold color={color} {...rest}>
          {children}
        </StyledH2Bold>
      );
    case "regular":
      return (
        <StyledH2 color={color} {...rest}>
          {children}
        </StyledH2>
      );
    case "light":
      return (
        <StyledH2Light color={color} {...rest}>
          {children}
        </StyledH2Light>
      );

    default:
      return (
        <StyledH2 color={color} {...rest}>
          {children}
        </StyledH2>
      );
  }
}

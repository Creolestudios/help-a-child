import React, { ReactNode } from "react";

import styled from "styled-components";
import { ColorType } from "../../../types/colorTypes";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  variant?: "bold" | "regular" | "light";
  color?: ColorType;
  children: ReactNode;
  style?: React.CSSProperties;
};

const BaseH1 = styled.h1<{ color: ColorType }>`
  font-size: 32px;
  line-height: 120%;
  color: ${({ theme, color }) => theme.colors[color].normal};
  font-style: normal;
  margin: 12px 0;

  @media ${({ theme }) => theme.devices.tablet} {
    margin: 0 0 22px;
    font-size: 48px;
    line-height: 140%;
  }
`;

const StyledH1Bold = styled(BaseH1)`
  font-weight: 700;
`;
const StyledH1 = styled(BaseH1)`
  font-weight: 400;
`;
const StyledH1Light = styled(BaseH1)`
  font-weight: 300;
`;

export default function H1({
  variant = "regular",
  color = "black",
  children,
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH1Bold color={color} {...rest}>
          {children}
        </StyledH1Bold>
      );
    case "regular":
      return (
        <StyledH1 color={color} {...rest}>
          {children}
        </StyledH1>
      );
    case "light":
      return (
        <StyledH1Light color={color} {...rest}>
          {children}
        </StyledH1Light>
      );

    default:
      return (
        <StyledH1 color={color} {...rest}>
          {children}
        </StyledH1>
      );
  }
}

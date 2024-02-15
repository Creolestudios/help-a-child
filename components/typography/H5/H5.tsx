import React, { ReactNode } from "react";

import styled from "styled-components";
import { ColorType } from "../../../types/colorTypes";

type Props = {
  variant?: "bold" | "regular" | "light";
  color?: ColorType;
  children: ReactNode;
  style?: React.CSSProperties;
};

const BaseH5 = styled.h5<{ color: ColorType }>`
  font-size: 20px;
  line-height: 110%;
  color: ${({ theme, color }) => theme.colors[color].normal};
  font-style: normal;
  margin: 12px 0;
`;

const StyledH5Bold = styled(BaseH5)`
  font-weight: 700;
`;
const StyledH5 = styled(BaseH5)`
  font-weight: 400;
`;
const StyledH5Light = styled(BaseH5)`
  font-weight: 300;
`;

export default function H5({
  variant = "regular",
  children,
  color = "black",
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH5Bold color={color} {...rest}>
          {children}
        </StyledH5Bold>
      );
    case "regular":
      return (
        <StyledH5 color={color} {...rest}>
          {children}
        </StyledH5>
      );
    case "light":
      return (
        <StyledH5Light color={color} {...rest}>
          {children}
        </StyledH5Light>
      );

    default:
      return (
        <StyledH5 color={color} {...rest}>
          {children}
        </StyledH5>
      );
  }
}

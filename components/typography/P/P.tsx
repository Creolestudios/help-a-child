import React, { ReactNode } from "react";

import styled from "styled-components";
import { ColorType } from "../../../types/colorTypes";

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  variant?: "bold" | "regular" | "italic" | "light" | "helper";
  color?: ColorType;
  children: ReactNode;
};

const BaseP = styled.p<{ color: ColorType }>`
  font-style: normal;
  font-size: 16px;
  line-height: 140%;
  color: ${({ theme, color }) => theme.colors[color].normal};
  margin: 12px 0;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 18px;
    line-height: 160%;
  }
`;

const StyledP = styled(BaseP)`
  font-weight: 400;
`;
const StyledPBold = styled(BaseP)`
  font-weight: 700;
`;
const StyledPItalic = styled(BaseP)`
  font-weight: 400;
  font-style: italic;
`;
const StyledPLight = styled(BaseP)`
  font-weight: 300;
`;
const StyledHelperText = styled(BaseP)`
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
`;

export default function P({
  variant = "regular",
  color = "black",
  children,
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledPBold {...rest} color={color}>
          {children}
        </StyledPBold>
      );
    case "italic":
      return (
        <StyledPItalic {...rest} color={color}>
          {children}
        </StyledPItalic>
      );
    case "regular":
      return (
        <StyledP {...rest} color={color}>
          {children}
        </StyledP>
      );
    case "light":
      return (
        <StyledPLight {...rest} color={color}>
          {children}
        </StyledPLight>
      );
    case "helper":
      return (
        <StyledHelperText {...rest} color={color}>
          {children}
        </StyledHelperText>
      );

    default:
      return (
        <StyledP {...rest} color={color}>
          {children}
        </StyledP>
      );
  }
}

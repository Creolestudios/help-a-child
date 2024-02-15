import React from "react";
import styled from "styled-components";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  hasPadding?: boolean;
};

const StyledFooter = styled.footer<{ hasPadding: boolean }>`
  padding: 32px;
`;

export default function CardFooter({
  hasPadding = true,
  children,
  ...rest
}: Props) {
  return (
    <StyledFooter hasPadding={hasPadding} {...rest}>
      {children}
    </StyledFooter>
  );
}

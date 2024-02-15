/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";

type Props = React.HtmlHTMLAttributes<HTMLDivElement>;

const StyledHeader = styled.header`
  height: 180px;
  position: relative;
`;

export default function CardHeader({ children, ...rest }: Props) {
  return <StyledHeader {...rest}>{children}</StyledHeader>;
}

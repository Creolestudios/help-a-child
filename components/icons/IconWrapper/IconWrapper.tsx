import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledIconWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function IconWrapper({
  children,
  ...rest
}: {
  children: ReactNode;
  style?: {};
}) {
  return <StyledIconWrapper {...rest}>{children}</StyledIconWrapper>;
}

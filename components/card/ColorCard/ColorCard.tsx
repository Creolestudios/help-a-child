import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div<{ color?: string }>`
  width: 100px;
  height: 100px;

  /* White */

  background: ${({ theme, color }) => color ?? theme.colors.white.normal};

  border: 1px solid #555555;
  border-radius: 24px;
`;

export default function ColorCard({ color = "white" }: { color?: string }) {
  return <StyledDiv color={color} />;
}

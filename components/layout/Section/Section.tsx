import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  /** Background color of the section */
  backgroundColor?: string;

  /** Content to be shown */
  children: ReactNode;

  paddingSize?: "sm" | "md";
  className?: string;
};

const Wrapper = styled.div<{ paddingSize: "sm" | "md" }>`
  border-radius: 8px;
  padding: ${({ paddingSize }) => (paddingSize === "md" ? "24px" : "12px")};

  @media ${({ theme }) => theme.devices.tablet} {
    padding: ${({ paddingSize }) =>
      paddingSize === "md" ? "51px 90px" : "24px"};
  }
`;

export default function Section({
  backgroundColor = "#FF971D",
  paddingSize = "md",
  children,
  className,
  ...rest
}: Props) {
  return (
    <Wrapper
      paddingSize={paddingSize}
      style={{ backgroundColor }}
      className={className}
      {...rest}
    >
      <div className="h-[100%]">{children}</div>
    </Wrapper>
  );
}

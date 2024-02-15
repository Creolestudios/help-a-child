import React from "react";
import styled, { css } from "styled-components";

type Props = {
  ordered?: boolean;
  children: React.ReactElement<"li"> | React.ReactElement<"li">[];
};

const BaseListStyle = css`
  counter-reset: gradient-counter;
  list-style: none;
  margin: 1.75rem 0;
  padding-left: 1rem;

  li {
    font-size: ${({ theme }) => theme.fontSizes.p.mobile};
    padding: 0 24px;
    position: relative;
    &::before {
      content: "";
      height: 12px;
      width: 12px;
      left: 0;
      top: 9px;
      overflow: hidden;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }
  }

  @media ${({ theme }) => theme.devices.laptop} {
    li {
      font-size: ${({ theme }) => theme.fontSizes.p.desktop};
    }
  }
`;

const StyledOL = styled.ol`
  ${BaseListStyle}

  li {
    counter-increment: gradient-counter;
    &::before {
      content: counter(gradient-counter);
      color: ${({ theme }) => theme.colors.primary.normal};
      font-weight: bold;
    }
  }
`;
const StyledUL = styled.ul`
  ${BaseListStyle}

  li {
    &::before {
      background: ${({ theme }) => theme.colors.primary.normal};
      border-radius: 100%;
    }
  }
`;

export default function TextList({ ordered, children }: Props) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  const generateChildren = (children: React.ReactElement<"li">[]) => {
    return children.map((child, index) => {
      if (child.type !== "li") {
        throw new Error(
          `Invalid child of type ${child.type} passed to MyComponent at index ${index}. Only li elements are allowed.`
        );
      }
      return child;
    });
  };

  if (ordered) {
    return <StyledOL>{generateChildren(children)}</StyledOL>;
  }
  return <StyledUL>{generateChildren(children)}</StyledUL>;
}

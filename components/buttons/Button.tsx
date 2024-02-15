import React, { ReactNode } from "react";
import styled, { css, useTheme } from "styled-components";

import { CircleSpinner } from "react-spinners-kit";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "link"
  | "info"
  | "white"
  | "infoReversed";

type Props = {
  variant?: ButtonVariant;
  filled?: boolean;
  hover?: boolean;
  children: ReactNode;

  /** Wether the button should be treated as a <a/> */
  href?: string;

  /** Wether the button is disabled */
  disabled?: boolean;

  /** Loading state of the button */
  loading?: boolean;

  /** Callback */
  onClick?: () => void;

  /** Additional styling */
  style?: React.CSSProperties;
  className?: string;
  target?: string;
};

const Style = css<Props>`
  width: 100%;
  height: 60px;
  border-radius: 12px;
  padding: 16px;

  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.p.mobile};
  color: ${({ theme }) => theme.colors.white.normal};
  line-height: 160%;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  @media (max-width: 767px) {
    height: 50px;
    line-height: 1;
  }
  &:disabled {
    cursor: not-allowed;
  }

  ${({ variant }) => {
    switch (variant) {
      case "secondary":
        return css`
          background: ${({ theme }) => theme.colors.secondary.normal};

          border: 2px solid ${({ theme }) => theme.colors.secondary.normal};
          &:hover {
            background-color: transparent;
            color: #3fc7b4;

            /* box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3); */
          }
        `;
      case "primary":
        return css`
          background: ${({ theme }) => theme.colors.secondary.normal};
          color: #3fc7b4 !important;
          border: 2px solid ${({ theme }) => theme.colors.secondary.normal};
          &:hover {
            // background-color: #3fc7b4 !important;
            // color: #fff !important;

            /* box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3); */
          }
        `;
      case "tertiary":
        return css`
          background: ${({ theme }) => theme.colors.tertiary.normal};
          border: 2px solid ${({ theme }) => theme.colors.tertiary.normal};
          &:hover {
            background-color: transparent;
            color: ${({ theme }) => theme.colors.tertiary.normal};
            /* box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3); */
          }
        `;
      case "success":
        return css`
          background: ${({ theme }) => theme.colors.success.normal};
          border: 2px solid ${({ theme }) => theme.colors.success.normal};
          &:hover {
            // background-color: transparent;
            // color: ${({ theme }) => theme.colors.success.normal};
            /* box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3); */
          }
        `;

      case "info":
        return css`
          background: ${({ theme }) => theme.colors.info.normal};
          color: #fff;
          border: 2px solid ${({ theme }) => theme.colors.info.normal};
          &:hover {
            background: transparent;
            color: ${({ theme }) => theme.colors.info.normal};
          }
        `;
      case "infoReversed":
        return css`
          background: transparent;
          color: ${({ theme }) => theme.colors.info.normal};
          border: 2px solid ${({ theme }) => theme.colors.info.normal};
          &:hover {
            background: ${({ theme }) => theme.colors.info.normal};
            color: #ffffff;
          }
        `;
      case "link":
        return css`
          background: transparent;
          text-decoration: underline;
          color: #010101;
          font-size: 24px;
          font-weight: 700;
          padding: 0;
          max-width: initial;
          width: initial;
          &:hover {
            color: ${({ theme }) => theme.colors.primary.normal};
          }
        `;

      default:
        return css`
          // background: ${({ theme }) => theme.colors.primary.normal};
          // color: #ffffff;
          // border: 2px solid ${({ theme }) => theme.colors.primary.normal};

          &:hover {
            // background-color: transparent;
            // color: ${({ theme }) => theme.colors.primary.normal};
            /* background: ${({ theme }) => theme.colors.black}; */
            /* box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3); */
          }
        `;
    }
  }}

  ${({ filled, variant }) =>
    !filled &&
    variant &&
    variant !== "link" &&
    css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors[variant].normal};
      border: 2px solid;
    `}
  
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.p.mobile};
  }
`;

const StyledButton = styled.button`
  ${Style}
  font-size: 18px;
  font-weight: 400;
  width: 100%;
`;

const StyledLink = styled.a`
  ${Style}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export default function Button({
  variant = "primary",
  filled = true,
  children,
  onClick,
  disabled = false,
  loading = false,
  href,
  className,
  target,
  ...rest
}: Props) {
  const { colors } = useTheme();

  if (href) {
    return (
      <StyledLink
        href={href}
        disabled={disabled}
        onClick={onClick}
        variant={variant}
        filled={filled}
        className={className}
        {...rest}
      >
        {loading && <CircleSpinner size={20} color={colors.white.normal} />}
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      filled={filled}
      className={className}
      target={target}
      {...rest}
    >
      {loading && <CircleSpinner size={20} color={colors.white.normal} />}
      {children}
    </StyledButton>
  );
}

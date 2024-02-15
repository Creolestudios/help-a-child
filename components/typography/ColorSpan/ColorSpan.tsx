import React, { ReactNode } from "react";
import { useTheme } from "styled-components";

type Props = {
  /** The theme color to be used as color */
  variant?: "primary" | "secondary" | "tertiary" | "info";

  /** Children can only be string */
  children: string;
};

export default function ColorSpan({ variant = "secondary", children }: Props) {
  const { colors } = useTheme();

  return <span style={{ color: colors[variant].normal }}>{children}</span>;
}

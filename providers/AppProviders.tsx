import React, { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "styled-components";
import CookieBanner from "../components/layout/CookieBanner/CookieBanner";
import { DEFAULT_THEME } from "../styles/theme";

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <CookiesProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        {children}
        <CookieBanner />
      </ThemeProvider>
    </CookiesProvider>
  );
}

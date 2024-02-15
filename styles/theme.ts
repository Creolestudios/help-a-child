import { DefaultTheme } from "styled-components";

export const COLORS = {
  // Teal
  primary: {
    normal: "#3FC7B4",
    light: "#FAFEFD",
    transparent: "rgba(63, 199, 180, 0.025)",
  },

  // Crimson
  secondary: {
    normal: "#FE517E",
    light: "#FE517E",
    transparent: "rgba(255, 151, 29, 0.025)",
  },

  // Blue
  tertiary: {
    normal: "#006EF7",
    light: "#F3F8FE",
    transparent: "rgba(0, 110, 247, 0.05)",
  },

  // Black
  text: {
    normal: "#150F2F",
    light: "#150F2F",
    transparent: "#150F2F",
  },

  // White
  white: {
    normal: "#fff",
    light: "#fff",
    transparent: "rgba(255, 255, 255, 0.7)",
  },

  // Black
  black: {
    normal: "#150F2F",
    light: "#150F2F",
    transparent: "#150F2F",
  },

  // Grey
  grey: {
    normal: "#EDEDED",
    light: "#EDEDED",
    transparent: "#EDEDED",
  },

  // Error red
  error: {
    normal: "#FF3333",
    light: "#FF3333",
    transparent: "#FF3333",
  },

  // Success
  success: {
    normal: "#06D6A0",
    light: "#06D6A0",
    transparent: "#06D6A0",
  },

  // Orange
  info: {
    normal: "#FF971D",
    light: "#FFFDF9",
    transparent: "rgba(255, 151, 29, 0.7)",
  },
  // Orange
  infoReversed: {
    normal: "#FF971D",
    light: "#FFFDF9",
    transparent: "rgba(255, 151, 29, 0.7)",
  },
};

export const SHADOWS = {
  sm: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  cardDefault: "0px 4px 25px 0px rgba(0, 0, 0, 0.1)",
  cardHover: "0px 4px 25px 0px rgba(0, 0, 0, 0.2)",
};

export const FONTS = {
  primary: "Fjalla One",
  secondary: "Avenir",
};

export const FONT_SIZES = {
  h1: {
    mobile: "32px",
    desktop: "48px",
  },
  h2: {
    mobile: "24px",
    desktop: "40px",
  },
  h3: {
    mobile: "16px",
    desktop: "32px",
  },
  h4: {
    mobile: "16px",
    desktop: "24px",
  },
  h5: {
    mobile: "16px",
    desktop: "24px",
  },
  h6: {
    mobile: "16px",
    desktop: "18px",
  },
  p: {
    mobile: "16px",
    desktop: "18px",
  },
};

export const BREAKPOINTS = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 410,
  tablet: 768,
  laptop: 1024,
  carouselLaptop: 1130,
  laptopL: 1440,
  desktop: 1800,
  desktopL: 2560,
};

export const DEVICES = {
  mobileS: `(min-width: ${BREAKPOINTS.mobileS}px)`,
  mobileM: `(min-width: ${BREAKPOINTS.mobileM}px)`,
  mobileL: `(min-width: ${BREAKPOINTS.mobileL}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  laptop: `(min-width: ${BREAKPOINTS.laptop}px)`,
  carouselLaptop: `(min-width: ${BREAKPOINTS.carouselLaptop}px)`,
  laptopL: `(min-width: ${BREAKPOINTS.laptopL}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
  desktopL: `(min-width: ${BREAKPOINTS.desktop}px)`,
};

export const DEFAULT_THEME: DefaultTheme = {
  name: "default",
  colors: COLORS,
  shadows: SHADOWS,
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  breakpoints: BREAKPOINTS,
  devices: DEVICES,
};

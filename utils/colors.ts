const hexToRgb = (hex: string) => {
  // http://stackoverflow.com/a/5624139
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Transforms a css hex to rgba value
 * @param hex hex color
 * @param alpha opacity
 * @returns css rgba() or defaults to hexvalue
 */
export const rgba = (hex: string, alpha: number) => {
  const color = hexToRgb(hex);

  if (color) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  }

  return hex;
};

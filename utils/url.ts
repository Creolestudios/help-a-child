/**
 * Takes an URL String and removes query params and hash params
 *
 * @param url - The URL string
 * @returns The transformed URL string
 *
 */
export const getPathFromUrl = (url: string): string => {
  return url.split(/[?#]/)[0];
};

/**
 * Detects if a given url leads to an internal path or not
 * @param url
 */
export const isInternalLink = (url: string): boolean => {
  // regex to check to check full urls and urls like //ajax.googleapis.com/
  const internalUrlRegex = /^\/\/|^\/(?!\/)/;

  return internalUrlRegex.test(url);
};

/**
 * Transforms a string into a slug
 * @param str string
 * @returns string
 */
export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

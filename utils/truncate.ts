export const truncate = (str: string, length: number) => {
  // remove html tags from string
  const text = str?.replace(/(<([^>]+)>)/gi, "");

  if (text?.length > length) {
    return text?.slice(0, length) + "...";
  }
  return text;
};

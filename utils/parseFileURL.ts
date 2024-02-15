export const parseFileURL = (fileID: string) => {
  return fileID
    ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${fileID}?download`
    : "";
};

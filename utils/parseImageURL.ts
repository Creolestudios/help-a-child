const parseImageURL = function (imageID: string | undefined, size?: number) {
  return imageID
    ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${imageID}?width=${
        size ?? 700
      }&quality=80`
    : `https://picsum.photos/${size ?? 700}`;
};

export default parseImageURL;

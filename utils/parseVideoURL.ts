const parseVideoURL = function (videoID: string | undefined) {
  return videoID ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${videoID}` : ``;
};

export default parseVideoURL;

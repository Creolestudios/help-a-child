import React, { memo } from "react";

import getVideoID from "get-video-id";
import styled from "styled-components";

type YoutubeProps = {
  src: string;
};

const StyledWrapper = styled.div`
  height: inherit;

  iframe {
    height: inherit;
    width: 100%;
    object-fit: contain;
  }
`;

function YoutubePlayer({ src }: YoutubeProps) {
  return (
    <StyledWrapper className="overflow-hidden ">
      {src && (
        <iframe
          src={`https://www.youtube.com/embed/${
            getVideoID(src).id ?? ""
          }?rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Help a child Embedded youtube"
        />
      )}
    </StyledWrapper>
  );
}

export default memo(YoutubePlayer);

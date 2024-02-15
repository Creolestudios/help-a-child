import { H3, P } from "../../typography";
import React, { useEffect, useRef, useState } from "react";

import IconButton from "../../buttons/IconButton/IconButton";
import { IoIosPlay } from "react-icons/io";
import styled from "styled-components";
import { VideoPropsType } from "./VideoItem.types";

const StyledFigure = styled.figure`
  background: #b8b8b8;

  overflow: hidden;
  position: relative;
  max-height: 624px;
  height: 624px;
  margin: 0;

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  figcaption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 32px;
    color: white;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 100%
    );

    h3,
    h4,
    h5,
    h6,
    p {
      color: inherit;
      text-align: left;
    }
  }
`;

const PlayIconWrapper = styled.div`
  position: absolute;
  top: calc(50% - 90px);
  left: calc(50% - 90px);
  transform: translate(calc(-50% + 90px), calc(-50% + 90px));
  cursor: pointer;
`;

const placeholderUrl =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VideoItem({
  title,
  subtitle,
  poster,
  src = placeholderUrl,
  className,
  autoPlay,
}: VideoPropsType) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    const player = videoRef.current;

    if (player && !isPlaying) {
      player.play();
      setIsPlaying(true);
    } else if (player) {
      player.pause();
      setIsPlaying(false);
    }
  };

  const stopVideo = () => {
    const player = videoRef.current;
    if (isPlaying && player) {
      player.pause();
      setIsPlaying(() => false);
    }
  };

  return (
    <StyledFigure className={className}>
      <video
        src={src}
        ref={videoRef}
        controls={isPlaying}
        onClick={stopVideo}
        poster={poster}
        onMouseEnter={autoPlay ? handlePlayPause : () => {}}
        onMouseLeave={autoPlay ? stopVideo : () => {}}
        muted
      ></video>
      {!isPlaying && (
        <>
          <PlayIconWrapper onClick={handlePlayPause}>
            <IconButton Icon={IoIosPlay} />
          </PlayIconWrapper>
          <figcaption>
            {!!title && <H3>{title}</H3>}
            {!!subtitle && <P className="text-[18px]">{subtitle}</P>}
          </figcaption>
        </>
      )}
    </StyledFigure>
  );
}

import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Script from "next/script";

export type TikTokPostProps = {
  name?: string;
  embed_code: string;
  date_created?: string;
  date_updated?: string;
};

const StyledPost = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 624px;
  // border: 1px solid ${({ theme }) => theme.colors.secondary.normal};

  > div {
    width: 100%;
    height: inherit;
  }

  iframe,
  blockquote {
    max-width: 100% !important;
    min-width: 100% !important;
    width: 100% !important;
    max-height: 624px !important;
    height: inherit !important;
    border: none !important;
    overflow: hidden;
    margin: 0;
  }
`;

export default function TikTokPost({ name, embed_code }: TikTokPostProps) {
  const id = `tiktok-embed-${uuidv4()}`;

  // this regex will parse through the html block looking for a script tag, if it finds one, the value will be the src from the script
  // const scriptSRC = embed_code.match(/src="([^"]*)"/)?.[1];
  const scriptSRC = "https://www.tiktok.com/embed.js";

  return (
    <StyledPost>
      <div
        dangerouslySetInnerHTML={{
          __html: embed_code,
        }}
      />
      {scriptSRC && <Script src={scriptSRC} id={id} />}
    </StyledPost>
  );
}

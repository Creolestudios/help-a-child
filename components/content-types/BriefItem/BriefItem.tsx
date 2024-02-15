import { H3, P, TitleWithHighlights } from "../../typography";
import React, { useState } from "react";

import Button from "../../buttons/Button";
/* eslint-disable @next/next/no-img-element */
import Card from "../../card/Card";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import Image from "next/image";
import Tag from "../../buttons/Tag/Tag";
import { truncate } from "../../../utils/truncate";

type Props = {
  btnHidden?: boolean;
  title: string;
  titleHighlighted?: string;
  imgSrc: string;
  fileSrc: string;
  category?: string;
  content: string;
  bg?: string;
  imgHeight?: number;
  className?: string;
};

export default function BriefItem({
  imgSrc,
  fileSrc,
  title,
  titleHighlighted,
  className,
  btnHidden,
  category,
  content,
  imgHeight = 180,
  bg = `#3FC7B4`,
}: Props) {
  const [hovering, setHovering] = useState<boolean>(false);
  bg = `#3FC7B4`;
  return (
    <Card variant="brief" className={className}>
      <CardHeader style={{ maxHeight: imgHeight, minHeight: imgHeight }}>
        <>
          <Image
            priority
            className="absolute h-full w-full top-0 left-0 z-0 object-cover"
            src={imgSrc}
            alt={title}
            fill
          />

          {!!category && (
            <Tag variant="dark" size="m" position="bl">
              {category}
            </Tag>
          )}
        </>
      </CardHeader>
      <CardFooter
        className={`group bg-[${bg}]  p-[24px] md:px-[24px] md:py-[32px]`}
      >
        <div>
          <div className="title-with-image">
            <TitleWithHighlights
              color="white"
              highlightColor="tertiary"
              text={title}
              headerElement="h3"
              className="transition  text-[30px] md:text-[32px]"
              style={{ fontWeight: "400" }}
            />
            <img src="/letterBlog.png" />
          </div>
          <P
            className="transition text-white "
            style={{
              maxHeight: 200,
              marginTop: 12,
              fontWeight: "300",
              overflow: "hidden",
            }}
          >
            {truncate(content, 500)}
          </P>
        </div>
        {!btnHidden && (
          <Button
            href={fileSrc}
            hover={hovering}
            style={
              hovering
                ? {
                    background: bg,
                    color: `white`,
                    fontWeight: `400`,
                    fontSize: `18px`,
                  }
                : {
                    background: `white`,
                    color: bg,
                    fontWeight: `400`,
                    fontSize: `18px`,
                  }
            }
            // variant="tertiary"
          >
            Lees verder
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

import { H4, P } from "../../typography";

import Image from "next/image";
import React from "react";

interface USPItemProps {
  title: string;
  description: string;
  imageURL?: string;
  imageAlt: string;
}

const USPItem: React.FC<USPItemProps> = ({
  title,
  description,
  imageURL,
  imageAlt,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {imageURL ? (
        <Image
          priority
          src={imageURL}
          alt={imageAlt}
          width={112}
          height={112}
          className="rounded-full h-[112px] w-[112px] object-cover mb-10"
        />
      ) : (
        <div className="w-[112px] h-[1px12] mb-10" />
      )}
      <H4 variant="bold">{title}</H4>
      <P>{description}</P>
    </div>
  );
};

export default USPItem;

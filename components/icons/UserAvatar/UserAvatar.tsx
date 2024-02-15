import Image from "next/image";
import React from "react";

type Props = {
  alt: string;
  size?: "sm" | "md";
  src: string;
};

export default function UserAvatar({ alt, src, size = "sm" }: Props) {
  const style = {
    borderRadius: "100%",
  };
  switch (size) {
    case "md":
      return (
        <Image
          priority
          style={style}
          src={src}
          height={64}
          width={64}
          alt={alt}
        />
      );
    default:
      return (
        <Image
          priority
          style={style}
          src={src}
          height={32}
          width={32}
          alt={alt}
        />
      );
  }
}

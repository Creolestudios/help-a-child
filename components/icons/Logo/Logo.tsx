import * as React from "react";

import Image from "next/image";
import { SVGProps } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "styled-components";

type Props = SVGProps<SVGSVGElement> & {
  variant?: "light" | "dark";
};

const White = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="602"
    height="300"
    viewBox="0 0 602 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect x="0.5" width="601.5" height="300" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_2318_1743"
          transform="scale(0.00249377 0.005)"
        />
      </pattern>
      <image
        id="image0_2318_1743"
        width="401"
        height="200"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const Dark = () => {
  const { devices } = useTheme();
  const isTablet = useMediaQuery(`${devices.tablet}`);

  return (
    <>
      <Image
        priority
        quality={100}
        src={"/logo.svg"}
        height={50}
        width={100}
        className={isTablet ? "" : "hidden"}
        alt="Logo help a child"
        // style={{ padding: "10px 0", marginRight: "40px" }}
      />
      <Image
        priority
        quality={100}
        src={"/logo.svg"}
        width={45}
        height={44.88}
        className={isTablet ? "hidden" : ""}
        alt="Logo help a child small"
        style={{ padding: "5px 0" }}
      />
    </>
  );
};

export default function Logo({ variant = "dark" }: Props) {
  switch (variant) {
    case "light":
      return <White />;

    default:
      return <Dark />;
  }
}

import * as React from "react";
import { SVGProps } from "react";

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={19}
    fill="none"
    {...props}
  >
    <path
      d="M4.234 4.75a4 4 0 1 0 4-4"
      stroke="#888"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M1.234 14.685c0-.86.541-1.628 1.351-1.918a16.795 16.795 0 0 1 11.298 0 2.036 2.036 0 0 1 1.351 1.918V16c0 1.188-1.051 2.1-2.227 1.932l-.954-.136a27.001 27.001 0 0 0-7.637 0l-.954.136A1.951 1.951 0 0 1 1.234 16v-1.315Z"
      stroke="#888"
      strokeWidth={1.5}
    />
  </svg>
);

export default UserIcon;

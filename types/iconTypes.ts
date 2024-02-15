import { SVGProps } from "react";
import { ColorType } from "./colorTypes";

export type IconProps = SVGProps<SVGSVGElement> & { color?: ColorType };

import React from "react";
import { Variant } from "../../components/card/Card";

type InfoCard = {
  title: string;
  icon: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  className?: string;
  children?: React.ReactNode;
  embedSrc?: string;
  mediaSrc?: string;
  poster?: string;
  videoClassName?: string;
};

export type InfoCardType = InfoCard & Variant;

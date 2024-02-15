import { P } from ".";

import { ColorType } from "../../types/colorTypes";
import React from "react";
import parseHTMLtoReact from "../../utils/parseHTMLtoReact";

interface TextWithHighlightsProps {
  text: string;
  textToHighlight?:
    | { word: string; color: string }
    | { word: string; color: string }[];
  color?: ColorType;
  variant?: "bold" | "regular" | "light" | "italic" | "helper";
  style?: React.CSSProperties;
  className?: string;
}

function regexReplace(
  text: string,
  searchString: string,
  highlightColor: string
) {
  const regex = new RegExp(`${searchString}`, "gi");

  return text.replace(
    regex,
    `<span
        className="font-heading p-[15px] rounded-[8px] font-normal mx-[10px] text-white"
        style="backgroundColor: ${highlightColor}; line-height: 1;"
      >
        $&
      </span>`
  );
}

const TextWithHighlights: React.FC<TextWithHighlightsProps> = ({
  text,
  textToHighlight,
  variant = "light",
  color = "primary",
  style,
  className,
}) => {
  let newText = text;

  if (textToHighlight && Array.isArray(textToHighlight)) {
    textToHighlight.forEach((highlight) => {
      newText = regexReplace(newText, highlight.word ?? "", highlight.color);
    });
  } else if (textToHighlight) {
    newText = regexReplace(
      newText,
      textToHighlight.word ?? "",
      textToHighlight.color
    );
  }

  return (
    <P
      color={color}
      variant={variant}
      style={style}
      className={className + " header-banner-text"}
    >
      <>{parseHTMLtoReact(newText)}</>
    </P>
  );
};

export default TextWithHighlights;

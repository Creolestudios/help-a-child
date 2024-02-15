import { H1, H2, H3, H4, H5, H6 } from ".";
import { ColorType } from "../../types/colorTypes";
import React from "react";
import parseHTMLtoReact from "../../utils/parseHTMLtoReact";
import { useTheme } from "styled-components";

interface TitleWithHighlightsProps {
  text: string;
  textToHighlight?: string | string[];
  headerElement?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: ColorType;
  highlightColor?: "info" | "tertiary";
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
        className="font-heading"
        style="color: ${highlightColor}; fontWeight: bold"
      >
        $&
      </span>`
  );
}

const TitleWithHighlights: React.FC<TitleWithHighlightsProps> = ({
  text,
  textToHighlight,
  headerElement = "h1",
  color = "primary",
  highlightColor = "info",
  style,
  className,
}) => {
  const theme = useTheme();
  let newText = text;

  if (textToHighlight && Array.isArray(textToHighlight)) {
    textToHighlight.forEach((highlight) => {
      newText = regexReplace(
        newText,
        highlight ?? "",
        "#fe517e"
        // theme.colors[highlightColor].normal
      );
    });
  } else if (textToHighlight) {
    newText = regexReplace(
      newText,
      textToHighlight ?? "",
      "#fe517e"
      // theme.colors[highlightColor].normal
    );
  }
  switch (headerElement) {
    case "h1":
      return (
        <H1
          color={color}
          variant="bold"
          style={style}
          className={className + " header-banner-title new-section-latest"}
        >
          <>{parseHTMLtoReact(newText)}</>
        </H1>
      );
    case "h2":
      return (
        <H2 color={color} variant="bold" style={style}>
          <>{parseHTMLtoReact(newText)}</>
        </H2>
      );
    case "h3":
      return (
        <H3 color={color} variant="bold" style={style} className={className}>
          <>{parseHTMLtoReact(newText)}</>
        </H3>
      );
    case "h4":
      return (
        <H4 color={color} variant="bold" style={style}>
          <>{parseHTMLtoReact(newText)}</>
        </H4>
      );
    case "h5":
      return (
        <H5 color={color} variant="bold" style={style}>
          <>{parseHTMLtoReact(newText)}</>
        </H5>
      );
    case "h6":
      return (
        <H6 color={color} variant="bold" style={style}>
          <>{parseHTMLtoReact(newText)}</>
        </H6>
      );

    default:
      return (
        <H1 color={color} variant="bold" style={style}>
          <>{parseHTMLtoReact(newText)}</>
        </H1>
      );
  }
};

export default TitleWithHighlights;

declare module "react-html-parser" {
  import * as React from "react";

  interface HtmlParserProps {
    html: string;
    transform?: (node: any, index: number) => React.ReactNode;
  }

  const HtmlParser: React.SFC<HtmlParserProps>;

  export default HtmlParser;
}

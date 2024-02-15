import ReactHtmlParser from "html-react-parser";

export default function parseHTMLtoReact(html: string) {
  return ReactHtmlParser(html ? html : "");
}

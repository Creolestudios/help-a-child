import { FiMinus, FiPlus } from "react-icons/fi";
import { H3, P } from "../../typography";
import styled, { useTheme } from "styled-components";

import { FAQ } from "../../../types/content-types/FAQ.type";
import React, { useEffect, useState } from "react";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";

interface FAQItemProps extends Partial<FAQ> {
  isSelected: boolean;
  onSelect: (id: string) => void;
  visible: boolean;
  setVisible: (params: boolean) => void;
  selected: string;
}

const StyleFaq = styled.div`
  .faq-title {
    font-size: 26px;
    font-family: "Fjalla One" !important;
    font-style: normal;
  }
  .description {
    transition: 0.3s ease-in-out;
    max-height: 1px;
    opacity: 0;
    overflow: hidden;

    font-family: "Avenir" !important;
    font-style: normal;
    p {
      font-size: 18px;
    }
    span {
      font-size: 18px;
    }
    &.visible {
      opacity: 1;
      max-height: 999px;
    }
  }
  @media (max-width: 767px) {
    .description {
      p {
        font-size: 18px;
      }
      span {
        font-size: 18px;
      }
    }
  }
`;
const FAQItem: React.FC<FAQItemProps> = ({
  id,
  selected,
  title,
  description,
  onSelect,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const handleSelect = () => {
    onSelect(id ?? "");

    setVisible(!visible); // Toggle the visibility state
  };

  return (
    <StyleFaq
      className={`p-[25px] md:pl-[61px] md:p-[42px] rounded-lg ${
        visible ? "bg-[#3FC7B4]" : "bg-[#3fc7b440]"
      } hover:bg-[#3FC7B4]`}
    >
      <div className="flex items-center justify-between text-left">
        <H3 color={visible ? "white" : "black"} className="faq-title">
          {title}
        </H3>
        <button
          onClick={handleSelect}
          className="cursor-pointer flex items-center justify-center w-8 h-8"
        >
          {visible ? (
            <FiMinus color={`white`} size={42} />
          ) : (
            <FiPlus color={`black`} size={42} />
          )}
        </button>
      </div>

      <div
        className={`description text-left ${visible ? "visible" : ""}`}
        style={{ color: "#fff" }}
      >
        {parseHTMLtoReact(description ?? "")}
      </div>
    </StyleFaq>
  );
};

export default FAQItem;

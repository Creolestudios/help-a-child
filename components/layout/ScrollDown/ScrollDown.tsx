import React, { FC } from "react";
import styled, { StyledComponentProps } from "styled-components";
import { FaChevronCircleDown } from "react-icons/fa";

interface IProps {
  marginTop: number;
  onClick?: () => Promise<void> | void;
}

const ScrollDownWrapper = styled.div<IProps>`
  width: 100%;
  height: 1px;
  position: relative;
  background: blue;
  margin-top: ${(props) => props.marginTop + "px"};
  .scroll-down-cta-container {
    position: absolute;
    background: linear-gradient(
      180deg,
      rgba(2, 0, 36, 0) -3%,
      rgba(255, 255, 255, 1) 52%
    );
    height: 200px;
    z-index: 1;
    width: 100%;
    bottom: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    padding-bottom: 20px;
    gap: 10px;
    .scroll-down-text {
      font-family: "Fjalla One";
      font-size: 18px;
    }
    .scroll-down-icon {
      cursor: pointer;
    }
  }
`;

const ScrollDown: FC<IProps> = ({ marginTop, onClick }) => {
  return (
    <ScrollDownWrapper marginTop={marginTop}>
      <div className="scroll-down-cta-container">
        <div className="scroll-down-text">Ontdek meer</div>
        <FaChevronCircleDown
          onClick={onClick}
          size={38}
          fill="#FE517E"
          className="scroll-down-icon"
        />
      </div>
    </ScrollDownWrapper>
  );
};

export default ScrollDown;

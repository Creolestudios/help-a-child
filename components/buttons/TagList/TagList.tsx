import { Container } from "@mui/system";
import React, { ReactNode, useRef } from "react";
import Tag from "../Tag/Tag";
import { Tag as TagType } from "../../../types/content-types/Tag.type";
import styled from "styled-components";
import { handleHorizantalScroll } from "../../../utils/horizontalScroll";

type Props = {
  tags: TagType[];
  selected?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onSelect?: (tag: string) => void;
};

const Wrapper = styled.div`
  background-color: #ebfffc;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;

  .right-arrow {
    display: none;
    cursor: pointer;
  }
  .right-arrow.active {
    display: block;
  }
  .left-arrow {
    display: none;
    cursor: pointer;
    transform: rotate(180deg);
  }
  .left-arrow.active {
    display: block;
  }
  .outer {
    position: relative;
    overflow: hidden;
    padding: 20px;

    .inner {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      width: 100%;
      &.active .scroll-indicator {
        display: none;
      }
      .tag {
        &:first-of-type {
          margin-left: auto;
        }

        &:last-of-type {
          margin-right: auto;
        }
      }

      .scroll-indicator {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100px;
        opacity: 0;
        pointer-events: none;
        border-radius: 8px;

        &.indicator-left {
          left: 0;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        &.indicator-right {
          right: 0;
          background: linear-gradient(
            to left,
            rgba(235, 255, 252, 1) 10%,
            rgba(235, 255, 252, 0) 100%
          );
        }
      }

      &::-webkit-scrollbar {
        display: none;
      }

      &.scrolling-left .indicator-left {
        opacity: 1;
      }
      &.scrolling-right .indicator-right {
        opacity: 1;
      }
    }
  }
  @media (max-width: 767px) {
    display: block;
    padding: 16px;
    .prefix {
      padding: 0 !important;
    }
    .right-arrow.active {
      display: none;
    }
    .outer {
      padding: 0;
    }
    .left-arrow.active {
      display: none;
    }
    .scroll-indicator {
      &.indicator-left {
        left: 0;
        background: none !important;
      }
      &.indicator-right {
        right: 0;
        background: none !important;
      }
    }
    .outer .inner {
      padding: 5px 0;
    }
    .hand-icon {
      transform: rotate(90deg);
      margin-top: 0px !important;
    }
  }
`;

export default function TagList({
  prefix,
  suffix,
  tags,
  selected,
  onSelect,
}: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const isSelected = (id: string) => selected === id;
  return (
    <Wrapper>
      <div
        style={{ display: "block", padding: "0px 5px 0 20px" }}
        className="prefix"
      >
        {prefix}
      </div>
      <div
        style={{ width: 81, padding: "0px 30px 0 0px" }}
        className={"left-arrow"}
        onClick={() => {
          handleHorizantalScroll({
            element: scrollRef.current,
            step: -100,
            leftArrow: leftArrow.current,
            rightArrow: rightArrow.current,
          });
        }}
        id="text"
        ref={leftArrow}
      >
        {suffix}
      </div>
      <div className="outer">
        <div ref={scrollRef} className="inner scrolling-right">
          <div className="scroll-indicator indicator-left" />
          {tags.map((tag, index) => (
            <Tag
              key={index}
              className="tag"
              isActive={isSelected(tag.id)}
              onClick={() => onSelect?.(isSelected(tag.id) ? "" : tag.id)}
              style={{
                backgroundColor: isSelected(tag.id) ? "#3FC7B4" : "transparent",
                color: isSelected(tag.id) ? "#fff" : "#150F2F",
                border: "1px solid #3FC7B4",
              }}
            >
              {tag.name}
            </Tag>
          ))}
          <div className="scroll-indicator indicator-right" />
        </div>
      </div>
      <div
        style={{ width: 77, padding: "0px 30px 0 4px" }}
        className="right-arrow active"
        onClick={() => {
          handleHorizantalScroll({
            element: scrollRef.current,
            step: 100,
            rightArrow: rightArrow.current,
            leftArrow: leftArrow.current,
          });
        }}
        ref={rightArrow}
      >
        {suffix}
      </div>
    </Wrapper>
  );
}

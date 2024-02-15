import React, { ReactNode, useEffect, useRef, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import styled from "styled-components";

type Props = {
  /** The amount of search results found */
  amount: number;
  suffix?: boolean;
  /** The color of the result block */
  colorVariant?: 1 | 2 | 3;

  /** The text that will be appended to the result title */
  resultTitleSuffix?: ReactNode;
  searchRef?: any;
  /** A list of links to pages the will be shown */
  list: {
    name: string;
    link: string;
  }[];
  cardHeight?: number;
};
const Wrapper = styled.div<{ colorVariant: number }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 8px;
  .scroll-content {
    align-items: center;
    color: #fff;
    bottom: 32px;
    font-size: 18px;
    font-weight: 500;
    position: absolute;
    left: 19%;
    span {
      font-size: 18px;
      display: inline-block;
    }
  }

  .scroll-content.top span {
    transform: rotate(90deg);
  }
  .scroll-content.bottom span {
    transform: rotate(270deg);
  }
  position: relative;
  .summary {
    font-family: "Fjalla One";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 120%;
    color: white;
    margin-bottom: 15px;
  }
  ul {
    height: 400px;
    overflow-y: auto;
  }
  .category {
    text-transform: capitalize;
  }
  .scrol-list-card {
    overflow-y: auto;
  }
  background: ${({ theme, colorVariant }) => {
    switch (colorVariant) {
      case 1:
        return theme.colors.tertiary.normal;
      case 2:
        return theme.colors.secondary.normal;
      case 3:
        return theme.colors.primary.normal;

      default:
        return theme.colors.tertiary.light;
    }
  }};
  padding: 50px 44px;
  ul {
    gap: 12px;
    border-radius: 8px;
    // padding-inline-start: 40px;

    li {
      a {
        span {
        }
      }
      font-weight: 500;
      font-size: 18px;
      line-height: 160%;
      margin-bottom: 15px;
      color: #ffff;
    }
  }
  @media (max-width: 767px) {
    padding: 35px 25px 76px !important;
  }
`;
export default function SearchResultItem({
  amount,
  resultTitleSuffix,
  suffix = false,
  list,
  cardHeight,
  searchRef,
  colorVariant = 1,
}: Props) {
  const [classes, setClasses] = useState("top");
  const ulRef = useRef(null);
  const [showScrollContent, setShowScrollContent] = useState(false);

  useEffect(() => {
    if (list.length > 0 && ulRef.current !== null) {
      const { clientHeight, scrollHeight, scrollTop } = ulRef.current;
      setShowScrollContent(scrollTop + clientHeight < scrollHeight);
      setClasses("top");
    }
  }, [list]);
  const handleScroll = (e: any) => {
    const ulElement: any = ulRef.current;
    if (ulElement) {
      const { scrollTop, scrollHeight, clientHeight } = ulElement;
      const isScrolledToBottom = scrollTop + clientHeight === scrollHeight;
      if (isScrolledToBottom) {
        // setShowScrollContent(false);
        setClasses("bottom");
      } else {
        setShowScrollContent(true);
        setClasses("top");
      }
    }
  };
  return (
    <Wrapper colorVariant={colorVariant}>
      <section>
        {suffix ? (
          <p className="summary uppercase">
            {amount}
            {amount === 1 ? " Resultaat" : " Resultaten"}
            {resultTitleSuffix}
          </p>
        ) : (
          <p className="summary uppercase">
            {amount} {resultTitleSuffix}
          </p>
        )}
      </section>

      {list.length > 0 && (
        <>
          <ul
            id="search-ul"
            className={"list-disc list-none"}
            ref={ulRef}
            onScroll={handleScroll}
          >
            {list.map((item) => (
              <li key={item.link}>
                <a
                  href={item.link}
                  className="flex items-center hover:underline"
                >
                  <span>{item.name}</span>
                  <BsChevronRight
                    className="ml-2 font-extrabold"
                    style={{ minWidth: 18 }}
                  />
                </a>
              </li>
            ))}
          </ul>
          {/* {scrollHeight > clientHeight + scrollTop && (
            <div className="">Scroll to view all</div>
          )} */}
          {showScrollContent && (
            <div className={`scroll-content ${classes}`}>
              Scroll verder en bekijk meer
              <span
                style={{
                  marginBottom: "-9px",
                  width: "30px",
                }}
                className="hand-icon"
              >
                <img src="/Onderwerp.png" />
              </span>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
}

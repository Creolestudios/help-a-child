import Button from "../../buttons/Button";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import { parseDate } from "../../../utils/parseDate";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import styled from "styled-components";
import { truncate } from "../../../utils/truncate";

type Props = {
  authorType: string;
  gender: string;
  age: string;
  title: string;
  content: string;
  truncateContent?: boolean;
  className?: string;
  button?: boolean;
  showButton?: boolean;
  buttonUrl?: string;
  name: string;
  tags: string[];
  comments?: number;
  fullHeight?: boolean;
  postDate?: Date;
  image: any;
};

type styledProps = {
  showButton?: boolean;
};

const StyledForumPost = styled.article<styledProps>`
  /* border: 1px solid ${({ theme }) => theme.colors.primary.normal}; */
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
  // overflow-y: auto;
  position: relative;
  z-index: 1;
  background-color: #006ef7 !important;
  height: 100%;
  @media (max-width: 767px) {
    height: auto !important;
  }
  // a {
  //   background: white;
  //   color: ${({ theme }) => theme.colors.secondary.normal};
  //   border: 0;
  // }

  &:hover {
    header {
      p,
      h4 {
      }
    }
    .forum-tag {
    }

    footer {
    }
  }

  /* TODO: required for the home grid */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
    p,
    h4 {
      color: white;
    }
  }

  .content {
    margin-bottom: 30px;
    font-size: ${({ theme }) => theme.fontSizes.p.desktop};
    font-family: "Avenir";
    color: white;
    > div {
      display: flex;
      gap: 8px;
      margin-bottom: 30px;
    }
    .forum-tags {
      span {
        padding: 11px 10px;
        background: white;
        border: none;
        height: 41px;
        color: 3FC7B4 !important;
        font-weight: 400;
        font-size: 18px;
        font-family: "Fjalla One";
      }
    }
  }
  .forum-tags {
    span {
      color: #006ef7 !important;
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    .geplaatst {
      color: white;
    }
    .icon-wrapper {
      display: flex;
      align-items: center;
      gap: 5.55px;
    }
    p {
      margin: 0;
    }
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    .content {
      font-size: ${({ theme }) => theme.fontSizes.p.mobile};
    }
  }
  @media (max-width: 767px) {
    height: auto !important;
  }
`;

export default function ForumPost({
  title,
  content,
  age,
  comments = 0,
  authorType,
  postDate,
  truncateContent = true,
  showButton = false,
  buttonUrl = "",
  fullHeight = true,
  tags = [],
  name,
  image,
  className,
  button,
}: Props) {
  const generateContent = () => {
    return parseHTMLtoReact(
      truncate(
        "Ik hIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbeneb ouders die ruzie hebbenIk hIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbeneb ouders die ruzie hebbenIk hIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbenIk heb ouders die ruzie hebbeneb ouders die ruzie hebben",
        150
      )
    );
  };
  const ComponentTag = showButton ? "div" : "div";
  const props = showButton ? { href: buttonUrl } : {};
  return (
    <StyledForumPost
      showButton={showButton}
      className={`main-forum ${className}`}
    >
      <ComponentTag {...props} className="flex flex-col h-[100%]">
        <div className="h-[100%]">
          <header>
            <div>
              <p className="font-extrabold text-lg text-[#fff]">{name}</p>
              <p className="text-[16px] md:text-[18px] font-[300]">
                {age?.includes("jaar") ? age : `${age} jaar`}
              </p>
            </div>
          </header>
          <div className="content text-[16px] md:text-[18px]">
            {tags.length > 0 && (
              <div className="flex flex-wrap forum-tags">
                {tags.map((item, index) => (
                  <Tag
                    key={index}
                    size="m"
                    className="forum-tag"
                    color="#006ef7"
                  >
                    {item}
                  </Tag>
                ))}
              </div>
            )}
            <h2>{authorType}</h2>
            {generateContent()}
          </div>
        </div>
        {button ? (
          <Link
            href={buttonUrl}
            className="forum-link hover:cursor-pointer mt-[0]"
          >
            <footer>
              <Button
                variant="tertiary"
                className="back-act h-[auto] lg:h-[60px] px-[10px] text-[16px] lg:px-[16px] lg:text-[18px]"
              >
                Laat een reachtie achter!
              </Button>
            </footer>
          </Link>
        ) : (
          <footer className="mt-0">
            <div>
              <div className="icon-wrapper mr-4">
                <FiHeart size={24} />
                <p className="font-avenir font-light text-[16px] md:text-[18px]">
                  {comments}
                </p>
              </div>
            </div>
            <div>
              {postDate && (
                <p className="geplaatst font-avenir font-light text-lg italic text-right">
                  Geplaatst op {parseDate(postDate)}
                </p>
              )}
            </div>
          </footer>
        )}
      </ComponentTag>
    </StyledForumPost>
  );
}

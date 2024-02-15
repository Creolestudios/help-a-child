import React from "react";
import styled, { css, useTheme } from "styled-components";
import { formatDistance } from "date-fns";
import { nl } from "date-fns/locale";

import { P } from "../../typography";
import Person from "../Person/Person";
// import ShareIcon from "../../icons/ShareIcon/ShareIcon";
// import MoreIcon from "../../icons/MoreIcon/MoreIcon";
import { rgba } from "../../../utils/colors";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { FiMessageCircle } from "react-icons/fi";
import ReplyIcon from "../../icons/ReplyIcon";

type Props = {
  commentFormType?: string;
  author: string;
  age: string;
  title: string;
  postDate?: Date;
  isReplyComment?: boolean;
  onReply?: () => void;
};

const StyledForumPost = styled.article<{ isReplyComment: boolean }>`
  position: relative;
  z-index: 1;
  margin-bottom: 40px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    padding: 24px;
    border-radius: 8px;
    margin-bottom: 34px;
    background-color: #ebfffc;
  }

  footer {
    display: flex;
    gap: 28px;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 12px;
  }
  .content p {
    font-family: "Avenir" !important;
    font-size: 18px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
  ${({ isReplyComment }) => {
    if (!isReplyComment) return null;

    return css`
      margin-top: -24px;
      padding-left: 34px;
    `;
  }}
`;

export default function ForumComment({
  title,
  author,
  age,
  postDate,
  isReplyComment = false,
  commentFormType,
  onReply,
}: Props) {
  const { colors } = useTheme();

  const handleReply = () => {
    if (onReply) {
      onReply();
    }
  };

  return (
    <StyledForumPost isReplyComment={isReplyComment}>
      <header>
        <Person age={age} name={author} />
        <div>
          {postDate && (
            <P
              variant="helper"
              style={{ textAlign: "right", color: "#150F2F" }}
              className="text-base font-avenir italic text-[16px] md:text-[18px]"
            >
              {formatDistance(postDate, new Date(), {
                includeSeconds: false,
                addSuffix: true,
                locale: nl,
              })}
            </P>
          )}
        </div>
      </header>
      <div className="content font-avenir text-[16px] leading-[160%] md:text-[18px]">
        {parseHTMLtoReact(title)}
        <footer className="bg-white -mx-6 -mb-6 justify-start">
          {
            <button className="flex mt-8" onClick={handleReply}>
              <ReplyIcon />
              <span className="ml-2 font-avenir text-lg font-light text-[16px] md:text-[18px]">
                Reageer
              </span>
              {/* <FiMessageCircle size={24} color={colors.secondary.normal} /> */}
            </button>
          }
          {/* <MoreIcon /> */}
        </footer>
      </div>
    </StyledForumPost>
  );
}

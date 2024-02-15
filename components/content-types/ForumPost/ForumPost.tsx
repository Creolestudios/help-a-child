import React, { useEffect, useState } from "react";
import Tag from "../../buttons/Tag/Tag";
import { parseDate } from "../../../utils/parseDate";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import styled from "styled-components";
import { truncate } from "../../../utils/truncate";
import { FiHeart } from "react-icons/fi";
import { H4, P } from "../../typography";
import Button from "../../buttons/Button";
import Link from "next/link";
import { updateForumDetails } from "../../../utils/api";
import { useSearchParams } from "next/navigation";
import { BsChat } from "react-icons/bs";

type Props = {
  id?: string;
  name?: string;
  gender: string;
  age: string;
  button?: boolean;
  authorType?: string;
  title: string;
  content: string;
  truncateContent?: boolean;
  showButton?: boolean;
  buttonUrl?: string;
  className?: string;
  tags: string[];
  comments?: number;
  fullHeight?: boolean;
  postDate?: Date;
  image: any;
  likesCount?: number;
  commentsCount?: number;
  fetchData?: () => Promise<void>;
};

type styledProps = {
  showButton?: boolean;
};

const StyledForumPost = styled.article<styledProps>`
  /* border: 1px solid ${({ theme }) => theme.colors.primary.normal}; */
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  &.main-forum {
    background-color: ${({ theme, showButton }: any) =>
      showButton
        ? theme.colors.secondary.normal
        : theme.colors.primary.normal} !important;

    width: 100%;
  }
  height: 100%;
  p {
  }
  > div:last-child {
    height: 100%;
    display: flex;
    flex-direction: column;
    > div {
      height: 100%;
    }
  }
  .forum-tag {
    color: #fe517e !important;
  }

  &:hover {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px -4px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;

    // background-color: ${({ theme }) => theme.colors.secondary.normal};
    border: 0;
    color: white;

    main-forum .forum-tag {
      background: #fff !important;
    }
    .main-forum .content {
      .forum-tags {
        span {
          background: ${({ theme }) =>
            theme.colors.secondary.normal} !important;
          border: none;
          color: white;
          font-weight: 400;
          font-size: 18px;
          font-family: "Fjalla One";
        }
      }
    }
  }

  /* TODO: required for the home grid */
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */

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
        color: #3fc7b4 !important;
        font-weight: 400;
        font-size: 18px;
        font-family: "Fjalla One";
      }
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

      gap: 5.55px;
      svg {
        cursor: pointer;
      }
    }
    p {
      margin: 0;
    }
  }
  .title {
    font-size: 32px !important;
    font-weight: 400;
  }
  &.main-forum.forum-post.forum-list {
    .forum-tags span {
      color: #3fc7b4 !important;
    }
    .back-act {
      background: #3fc7b4 !important;
      border: none !important;
    }
  }
  .custom_form_tags {
    height: 170px;
    overflow-y: auto !important;
  }
  @media (max-width: 767px) {
    height: auto !important;
    .title {
      font-size: 24px !important;
    }
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    .content {
      font-size: ${({ theme }) => theme.fontSizes.p.mobile};
    }
  }
`;

export default function ForumPost({
  id,
  button,
  title,
  content,
  age,
  comments = 0,
  postDate,
  truncateContent = true,
  showButton = false,
  buttonUrl = "",
  fullHeight = true,
  tags = [],
  name,
  className,
  likesCount = 0,
  commentsCount,
  fetchData,
}: Props) {
  const [isPostLiked, setIsPostLiked] = useState(false);

  const generateContent = () => {
    if (fullHeight && truncateContent) {
      return parseHTMLtoReact(truncate(content, 500));
    } else if (truncateContent) {
      return parseHTMLtoReact(truncate(content, 180));
    }
    return parseHTMLtoReact(content);
  };

  const ComponentTag = showButton ? "a" : "div";
  const props = showButton ? { href: buttonUrl } : {};

  useEffect(() => {
    const likedForumPosts: string[] = JSON.parse(
      localStorage.getItem("liked-forum-posts") || "[]"
    );
    setIsPostLiked(likedForumPosts.includes(id ?? ""));
  }, [likesCount, id]);

  /**
   * Update the likes count in CMS and store the liked post id in local storage.
   */
  const updateLikesData = async () => {
    const likedForumPosts = JSON.parse(
      localStorage.getItem("liked-forum-posts") || "[]"
    );
    let payload = {
      likes_count: likesCount,
    };
    if (isPostLiked) {
      const postIdIndex = likedForumPosts.findIndex(
        (postId: string) => id === postId
      );
      likedForumPosts.splice(postIdIndex, 1);
      payload.likes_count = payload.likes_count! - 1;
    } else {
      likedForumPosts.push(id);
      payload.likes_count = payload.likes_count! + 1;
    }

    const response = await updateForumDetails(id!, payload);
    const data = await response?.json();

    if (data?.data) {
      localStorage.setItem(
        "liked-forum-posts",
        JSON.stringify(likedForumPosts)
      );
      if (fetchData) {
        fetchData();
      }
    }
  };

  return (
    <StyledForumPost
      showButton={showButton}
      style={{ minHeight: fullHeight ? "624px" : "" }}
      className={`main-forum ${className} overflow-auto`}
    >
      <div>
        <p className="font-extrabold text-lg text-[#fff]">{name}</p>
        <p className="text-[16px] text-[#fff] md:text-[18px] font-[300]">
          {age?.includes("jaar") ? age : `${age} jaar`}
        </p>
        <div>
          <div className="content text-[16px] md:text-[18px]">
            {tags.length > 0 && (
              <div className="flex flex-wrap forum-tags my-[32px]">
                {tags.map((item, index) => (
                  <Tag key={index} size="m" className="forum-tag">
                    {item}
                  </Tag>
                ))}
              </div>
            )}
            {!!title && (
              <H4
                variant="bold"
                color="white"
                className="title my-[30px] font-[32px]"
              >
                {truncate(title, 75)}
              </H4>
            )}
            <div className="custom_forum_tags">{generateContent()}</div>
          </div>
        </div>
      </div>
      {button ? (
        <Link href={buttonUrl} className="forum-link hover:cursor-pointer">
          <footer>
            <Button
              variant="secondary"
              className="back-act h-[auto] lg:h-[60px] px-[10px] text-[16px] lg:px-[16px] lg:text-[18px]"
            >
              Laat een reachtie achter!
            </Button>
          </footer>
        </Link>
      ) : (
        <ComponentTag {...props} className="forum-footer">
          <footer>
            <div>
              <div className="icon-wrapper mr-4">
                <div className="flex gap-1 likes">
                  <FiHeart
                    size={24}
                    fill={isPostLiked ? "#fff" : "none"}
                    onClick={updateLikesData}
                  />
                  <p className="font-avenir font-light text-[16px] md:text-[18px]">
                    {likesCount}
                  </p>
                </div>
                <div className="flex gap-1 comments">
                  <BsChat size={24} />
                  <p className="font-avenir font-light text-[16px] md:text-[18px]">
                    {commentsCount}
                  </p>
                </div>
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
        </ComponentTag>
      )}
    </StyledForumPost>
  );
}

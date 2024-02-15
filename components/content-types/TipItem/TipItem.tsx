import { H4, P } from "../../typography";
import styled, { useTheme } from "styled-components";

import Button from "../../buttons/Button";
import Card from "../../card/Card";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import { parseDate } from "../../../utils/parseDate";
import { truncate } from "../../../utils/truncate";
import Image from "next/image";

type Props = {
  button?: boolean;
  author?: string;
  title: string;
  content: string;
  truncateContent?: boolean;
  showButton?: boolean;
  buttonUrl?: string;
  className?: string;
  tags: string[];
  postDate: Date;
  imageSrc?: string;
};

type styledProps = {
  showButton?: boolean;
};

const StyledTipPost = styled.article<styledProps>`
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
      align-items: center;
      gap: 5.55px;
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

export default function TipItem({
  title,
  author,
  content,
  postDate,
  buttonUrl = "",
  tags = [],
  imageSrc = "",
}: Props) {
  const { colors } = useTheme();

  return (
    <Card variant="blog">
      <CardHeader
        style={{
          height: !!imageSrc ? "" : "fit-content",
        }}
      >
        <div className="relative w-full h-full">
          {imageSrc && (
            <Image
              className="z-0 object-cover"
              src={imageSrc}
              alt={title}
              fill
              loading="lazy"
              quality={100}
            />
          )}
          <div className="absolute bottom-0 left-0 p-4 flex flex-wrap gap-3 forum-tags">
            {tags.length > 0 &&
              tags.map((tag, index) => (
                <Tag
                  key={index}
                  variant="dark"
                  size="m"
                  style={{
                    backgroundColor: colors.info.normal,
                    borderColor: colors.info.normal,
                  }}
                >
                  <>{tag}</>
                </Tag>
              ))}
          </div>
        </div>
      </CardHeader>
      <CardFooter>
        <H4 className="text-new" style={{ margin: 0 }}>
          {truncate(title, 23)}
        </H4>
        {!!content ? (
          <div className="blog-description">
            <P style={{ marginBottom: 30, marginTop: 12 }}>
              {truncate(content, 600)}
            </P>
          </div>
        ) : (
          <div style={{ overflowY: "auto", height: 90 }}>
            {!!content && (
              <P style={{ marginBottom: 30, marginTop: 12 }}>
                {content ? truncate(content, 600) : ""}
              </P>
            )}
          </div>
        )}
        <div className="flex items-center justify-between author-date mb-[20px] mt-[0]">
          <p style={{ fontWeight: "700" }} className="text-lg">
            {author}
          </p>
          <p
            className="italic font-light font-avenir "
            style={{ fontSize: "18px" }}
          >
            Geplaatst op: {parseDate(postDate)}
          </p>
        </div>
        <Button
          style={{ marginTop: "auto" }}
          variant={"primary"}
          href={buttonUrl}
        >
          Lees meer
        </Button>
      </CardFooter>
    </Card>
  );
}

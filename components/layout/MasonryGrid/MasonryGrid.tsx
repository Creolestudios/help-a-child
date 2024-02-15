import InstagramPost, {
  InstaPost,
} from "../../content-types/InstagramPost/InstagramPost";
import React, { useEffect, useState } from "react";
import TikTokPost, {
  TikTokPostProps,
} from "../../content-types/TikTokPost/TikTokPost";
import { Variants, motion } from "framer-motion";

import BlogItem from "../../content-types/BlogItem/BlogItem";
import { BlogType } from "../../../types/content-types/Blog.type";
import BriefItem from "../../content-types/BriefItem/BriefItem";
import ChatExampleItem from "../../content-types/ChatExampleItem/ChatExampleItem";
import { Container } from "@mui/material";
import ForumPost from "../../content-types/ForumPost/ForumPost";
import { ForumPostType } from "../../../types/forumTypes";
import { Letter } from "../../../types/content-types/Letter.type";
import { MasonryGridWrapper } from "./MasonryGrid.styled";
import TipItem from "../../content-types/TipItem/TipItem";
import { TipPostType } from "../../../types/tipTypes";
import VideoItem from "../../content-types/VideoItem/VideoItem";
import { VideoPropsType } from "../../content-types/VideoItem/VideoItem.types";
import parseImageURL from "../../../utils/parseImageURL";

export type FeedType =
  | "forum"
  | "tip"
  | "instagram"
  | "tiktok"
  | "video"
  | "letter"
  | "chat"
  | "blog";

export type FeedItem = {
  id: string;
  width: 1 | 2 | 3 | number;
  type: FeedType;
  cols?: number;
  content:
    | Letter
    | BlogType
    | ForumPostType
    | VideoPropsType
    | TikTokPostProps
    | TipPostType;
};

type Props = {
  fullHeightItems?: boolean;
  className?: string;
  feed: FeedItem[];
};

export function MasonryGrid({
  fullHeightItems = true,
  feed = [],
  className,
}: Props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (feed.length > 0) {
      setLoading(false);
    }
  }, [feed]);

  if (loading) {
    return (
      <MasonryGridWrapper>
        <Container>
          <p>Laden...</p>
        </Container>
      </MasonryGridWrapper>
    );
  }

  return (
    <MasonryGridWrapper>
      <Container className="max-w-[1384px] px-[13px]">
        <div id="mason-grid" className="mason-grid">
          {feed.map((item, index) => {
            const { content } = item;
            switch (item.type) {
              case "video":
                const videoContent = content as VideoPropsType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <VideoItem
                      poster={videoContent.poster}
                      title={videoContent.title}
                      src={videoContent.src}
                      subtitle={videoContent.subtitle}
                    />
                  </motion.div>
                );

              case "letter":
                const letterContent = content as Letter;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <BriefItem
                      key={letterContent.id}
                      title={letterContent.title}
                      bg={letterContent.bg_color}
                      content={letterContent.description}
                      imgSrc={parseImageURL(letterContent?.image?.id)}
                      fileSrc={`/open-brieven/${letterContent.slug}`}
                      category={
                        letterContent?.categories?.[0]?.categories_id?.name
                      }
                    />
                  </motion.div>
                );
              case "forum":
                const forumContent = content as ForumPostType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <ForumPost
                      id={forumContent?.id}
                      showButton
                      fullHeight={fullHeightItems}
                      buttonUrl={`/forum/${forumContent.slug}`}
                      truncateContent
                      gender={forumContent.user_gender}
                      image={parseImageURL(forumContent?.user_image?.id)}
                      age={forumContent.user_age}
                      name={forumContent.user_name}
                      postDate={new Date(forumContent.date_created)}
                      tags={
                        forumContent.categories?.map(
                          (cat) => cat.categories_id?.name
                        ) ?? []
                      }
                      title={
                        forumContent.title ??
                        "Titel moet in CMS worden ingevoerd"
                      }
                      comments={forumContent.comments.length}
                      content={forumContent.content}
                    />
                  </motion.div>
                );
              case "tip":
                const tipContent = content as TipPostType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <TipItem
                      showButton
                      buttonUrl={`/tips/${tipContent.slug}`}
                      truncateContent
                      postDate={new Date(tipContent.date_created)}
                      tags={
                        tipContent.categories?.map(
                          (cat) => cat.categories_id?.name
                        ) ?? []
                      }
                      title={tipContent.name ?? ""}
                      content={tipContent.introduction}
                      imageSrc={
                        tipContent.image
                          ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${tipContent.image?.id}`
                          : ""
                      }
                    />
                  </motion.div>
                );
              case "blog":
                const blogContent = content as BlogType;

                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width} ${className}`}
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <BlogItem
                      mediaSrc={
                        blogContent.image
                          ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${blogContent.image.id}?width=400`
                          : ""
                      }
                      embedSrc={blogContent.youtube_embed}
                      link={`/verhalen/${blogContent.slug}`}
                      type={blogContent.type}
                      author={blogContent.author}
                      description={blogContent.content}
                      buttonText={
                        blogContent.type == "vlog"
                          ? "Vlog bekijken"
                          : "Blog lezen"
                      }
                      content={blogContent.content}
                      postDate={new Date(blogContent.date_created)}
                      category={
                        blogContent?.categories?.[0]?.categories_id?.name
                      }
                      title={blogContent.title}
                    />
                  </motion.div>
                );
              case "instagram":
                const instaContent = content as InstaPost;

                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <InstagramPost embed_code={instaContent.embed_code} />
                  </motion.div>
                );
              case "tiktok":
                // TODO: replace with CMS content
                const tiktokContent = content as TikTokPostProps;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <TikTokPost embed_code={tiktokContent.embed_code} />
                  </motion.div>
                );
              case "chat":
                // TODO: replace with CMS content
                const chatContent = content as VideoPropsType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <ChatExampleItem />
                  </motion.div>
                );

              default:
                return null;
            }
          })}
        </div>
      </Container>
    </MasonryGridWrapper>
  );
}

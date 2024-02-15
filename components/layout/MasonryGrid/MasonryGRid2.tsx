import InstagramPost, {
  InstaPost,
} from "../../content-types/InstagramPost/InstagramPost";
import React, { useEffect, useState } from "react";
import TikTokPost, {
  TikTokPostProps,
} from "../../content-types/TikTokPost/TikTokPost";

import BlogItem from "../../content-types/BlogItem/BlogItem";
import { BlogType } from "../../../types/content-types/Blog.type";
import BriefItem from "../../content-types/BriefItem/BriefItem";
import ChatExampleBlue from "../../content-types/ChatExampleItem/ChatExampleBlue";
import ChatExampleItem from "../../content-types/ChatExampleItem/ChatExampleItem";
import ChatExampleNew from "../../content-types/ChatExampleItem/ChatExampleNew";
import { Container } from "@mui/material";
import ForumPost from "../../content-types/ForumPost/ForumPost";
import ForumPost2 from "../../content-types/ForumPost/ForumPost2";
import { ForumPostType } from "../../../types/forumTypes";
import { Letter } from "../../../types/content-types/Letter.type";
import Link from "next/link";
import { MasonryGridWrapper } from "./MasonryGrid.styled";
import NewPostItem from "../../content-types/NewPostItem/NewPostItem";
import { TipPostType } from "../../../types/tipTypes";
import VideoItem from "../../content-types/VideoItem/VideoItem";
import { VideoPropsType } from "../../content-types/VideoItem/VideoItem.types";
import { motion } from "framer-motion";
import parseImageURL from "../../../utils/parseImageURL";
import parseVideoURL from "../../../utils/parseVideoURL";

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
  homepage?: boolean;
  pagetopRes?: any;
};

export function MasonryGrid({
  fullHeightItems = true,
  feed = [],
  className,
  homepage = false,
  pagetopRes,
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
  const { videos, chats_item, instagram, letter, forum, blog_quote } =
    pagetopRes || {};
  const blogTips = blog_quote?.filter((item: any) => {
    return item?.categories?.find(
      (category: any) =>
        category?.categories_id?.name === "Tips" && category !== undefined
    );
  });
  const blogQuote1 = blog_quote?.filter(
    (item: any) => item.id !== blogTips?.[0]?.id
  );

  const blogQuote2 = blog_quote?.filter(
    (item: any) =>
      item.id !== blogTips?.[0]?.id && item.id !== blogQuote1?.[0]?.id
  );

  return (
    <MasonryGridWrapper>
      <Container className="max-w-[1384px] px-[16px] md:px-[32px]">
        <div id="mason-grid" className="mason-grid">
          {homepage && (
            <div className="home-cntnt-wrapper">
              <div className="home-cntnt-mn">
                {videos?.length > 0 && (
                  <div className="video-log-div">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <VideoItem
                        poster={parseImageURL(
                          videos?.[0]?.video_cover_image?.id
                        )}
                        title={videos?.[0]?.title}
                        src={parseVideoURL(videos?.[0]?.video_file?.id)}
                        subtitle={videos?.[0]?.subtitle}
                        className="rounded-[8px]"
                        autoPlay
                      />
                    </motion.div>
                  </div>
                )}

                {chats_item?.length > 0 && (
                  <div className="chat-orange">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <ChatExampleNew
                        convo={chats_item?.[0]?.chat_buddy}
                        buddy={chats_item?.[0]?.budy}
                        name={chats_item?.[0]?.name}
                        age={chats_item?.[0]?.age}
                      />
                    </motion.div>
                  </div>
                )}

                {letter?.length > 0 && (
                  <div className="blog-post">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <BriefItem
                        title={letter?.[0]?.title}
                        category={
                          letter?.[0]?.categories?.[0]?.categories_id?.name
                        }
                        bg="#3FC7B4"
                        content={letter?.[0]?.description}
                        imgSrc={
                          letter[0]?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${letter?.[0]?.image?.id}`
                            : ""
                        }
                        fileSrc={`/open-brieven/${letter[0]?.slug}`}
                      />
                    </motion.div>
                  </div>
                )}

                {forum?.length > 0 && (
                  <div className="forum-post relative">
                    <motion.div
                      className={`grid-item grid-item-w-10 forum-card`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <div className="forum-content">
                        <div className="front">
                          <ForumPost
                            id={forum?.[0]?.id}
                            showButton
                            fullHeight={false}
                            buttonUrl={`/forum/${forum?.[0]?.slug}`}
                            truncateContent
                            gender={forum?.[0]?.user_gender}
                            image={parseImageURL(forum?.[0]?.user_image?.id)}
                            age={forum?.[0]?.user_age}
                            name={forum?.[0]?.user_name}
                            postDate={new Date(forum[0].date_created)}
                            tags={
                              forum?.[0]?.categories?.map(
                                (cat: any) => cat.categories_id?.name
                              ) ?? []
                            }
                            title={
                              forum?.[0]?.title ??
                              "Titel moet in CMS worden ingevoerd"
                            }
                            comments={forum?.[0]?.comments?.length}
                            className="forum-post"
                            content={forum?.[0]?.content}
                          />
                        </div>
                        <div className="back z-10">
                          <ForumPost
                            id={forum?.[0]?.id}
                            showButton
                            fullHeight={false}
                            buttonUrl={`/forum/${forum?.[0]?.slug}`}
                            truncateContent
                            gender={forum?.[0]?.user_gender}
                            image={parseImageURL(forum?.[0]?.user_image?.id)}
                            age={forum?.[0]?.user_age}
                            name={forum?.[0]?.user_name}
                            postDate={new Date(forum[0].date_created)}
                            tags={
                              forum?.[0]?.categories?.map(
                                (cat: any) => cat.categories_id?.name
                              ) ?? []
                            }
                            title={
                              forum?.[0]?.title ??
                              "Titel moet in CMS worden ingevoerd"
                            }
                            comments={forum?.[0]?.comments?.length}
                            className="forum-post"
                            content={forum?.[0]?.content}
                            button={true}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {chats_item?.length > 1 && (
                  <div className="chat-orange">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <ChatExampleBlue
                        convo={chats_item?.[1]?.chat_buddy}
                        buddy={chats_item?.[1]?.budy}
                        name={chats_item?.[1]?.name}
                        age={chats_item?.[1]?.age}
                      />
                    </motion.div>
                  </div>
                )}

                {videos?.length > 1 && (
                  <div className="video-log-div">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <VideoItem
                        poster={parseImageURL(
                          videos?.[1]?.video_cover_image?.id
                        )}
                        title={videos?.[1]?.title}
                        src={parseVideoURL(videos?.[1]?.video_file?.id)}
                        subtitle={videos?.[1]?.subtitle}
                        className="rounded-[8px]"
                        autoPlay
                      />
                    </motion.div>
                  </div>
                )}

                {blogQuote1?.length > 0 && (
                  <div className="new-post-item">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <NewPostItem
                        title={blogQuote1?.[0]?.title}
                        description={blogQuote1?.[0]?.content}
                        buttonText="quote"
                        bgImg={
                          blogQuote1?.[0]?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${blogQuote1?.[0]?.image.id}?width=700`
                            : ""
                        }
                      />
                    </motion.div>
                  </div>
                )}
                {letter?.length > 1 && (
                  <div className="blog-post">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <BriefItem
                        title={letter?.[1]?.title}
                        category={
                          letter?.[0]?.categories?.[0]?.categories_id?.name
                        }
                        bg="#3FC7B4"
                        content={letter?.[1]?.description}
                        imgSrc={
                          letter?.[1]?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${letter?.[1]?.image?.id}`
                            : ""
                        }
                        fileSrc={`/open-brieven/${letter?.[1]?.slug}`}
                      />
                    </motion.div>
                  </div>
                )}
                {blogQuote2?.length > 0 && (
                  <div className="new-post-item">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <NewPostItem
                        title={blogQuote2?.[0]?.title}
                        description={blogQuote2?.[0]?.content}
                        buttonText="quote"
                        bgImg={
                          blogQuote2?.[0]?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${blogQuote2?.[0]?.image.id}?width=700`
                            : ""
                        }
                      />
                    </motion.div>
                  </div>
                )}
                {blogTips?.length > 0 && (
                  <div className="new-post-item">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <NewPostItem
                        title={blogTips?.[0]?.title}
                        description={blogTips?.[0]?.content}
                        buttonText="Tips"
                        bgImg={
                          blogTips?.[0]?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${blogTips?.[0]?.image?.id}`
                            : ""
                        }
                      />
                    </motion.div>
                  </div>
                )}
                {forum?.length > 1 && (
                  <div className="three-post">
                    <div className="blog-post forum-post min-h-[350px] md:min-h-[450px] lg:min-h-[350px]">
                      <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        className="forum-card h-auto md:h-[100%]"
                      >
                        <div className="forum-content forum-post-2">
                          <div className="front">
                            <ForumPost2
                              showButton
                              fullHeight={false}
                              buttonUrl={`/forum/${forum?.[0]?.slug}`}
                              truncateContent
                              gender={forum?.[1]?.user_gender}
                              image={parseImageURL(forum?.[0]?.user_image?.id)}
                              age={forum?.[1]?.user_age}
                              name={forum?.[1]?.user_name}
                              postDate={new Date(forum[0].date_created)}
                              tags={
                                forum?.[0]?.categories?.map(
                                  (cat: any) => cat.categories_id?.name
                                ) ?? []
                              }
                              title={
                                forum?.[0]?.title ??
                                "Titel moet in CMS worden ingevoerd"
                              }
                              comments={forum?.[0]?.comments?.length}
                              className="forum-post"
                              authorType=""
                              content={forum?.[0]?.content}
                            />
                          </div>
                          <div className="back z-10">
                            <ForumPost2
                              showButton
                              fullHeight={false}
                              buttonUrl={`/forum/${forum?.[0]?.slug}`}
                              truncateContent
                              gender={forum?.[1]?.user_gender}
                              image={parseImageURL(forum?.[1]?.user_image?.id)}
                              age={forum?.[1]?.user_age}
                              name={forum?.[1]?.user_name}
                              postDate={new Date(forum[1].date_created)}
                              tags={
                                forum?.[1]?.categories?.map(
                                  (cat: any) => cat.categories_id?.name
                                ) ?? []
                              }
                              title={
                                forum?.[1]?.title ??
                                "Titel moet in CMS worden ingevoerd"
                              }
                              comments={forum?.[0]?.comments?.length}
                              className="forum-post"
                              authorType=""
                              content={forum?.[0]?.content}
                              button={true}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    {letter?.length > 2 && (
                      <div className="blog-post">
                        <motion.div
                          initial="offscreen"
                          whileInView="onscreen"
                          viewport={{ once: true, amount: 0.1 }}
                        >
                          <BriefItem
                            title={letter?.[2]?.title}
                            category={
                              letter?.[2]?.categories?.[0]?.categories_id?.name
                            }
                            bg="#3FC7B4"
                            content={letter?.[2]?.description}
                            imgSrc={
                              letter?.[2]?.image
                                ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${letter?.[2]?.image?.id}`
                                : ""
                            }
                            fileSrc={`/open-brieven/${letter[2]?.slug}`}
                          />
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}
                {instagram?.length > 0 && (
                  <div className="custom_inst_post">
                    <div className="inst-post">
                      <motion.div
                        className={`grid-item grid-item-w-10`}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                      ></motion.div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {feed.map((item, index) => {
            const { content } = item;

            switch (item.type) {
              case "video":
                const videoContent = content as VideoPropsType & {
                  home_show_top_data?: any;
                };
                return (
                  <>
                    {videoContent?.home_show_top_data === null && (
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
                          className="rounded-[8px]"
                          autoPlay
                        />
                      </motion.div>
                    )}
                  </>
                );

              case "letter":
                const letterContent = content as Letter & {
                  home_show_top_data?: any;
                };
                return (
                  <>
                    {!letterContent.description.includes("Vil") && (
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
                          category={
                            letterContent?.categories?.[0]?.categories_id?.name
                          }
                          bg={letterContent.bg_color}
                          content={letterContent.description}
                          imgSrc={
                            letterContent?.image
                              ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${letterContent?.image?.id}`
                              : ""
                          }
                          fileSrc={`/open-brieven/${letterContent.slug}`}
                        />
                      </motion.div>
                    )}
                  </>
                );
              case "forum":
                const forumContent = content as ForumPostType & {
                  home_show_top_data?: any;
                };
                return (
                  <>
                    {forumContent?.home_show_top_data === null && (
                      <motion.div
                        className={`grid-item grid-item-w-${item.width} forum-card`}
                        key={index}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                      >
                        <div className="forum-content">
                          <div className="front">
                            <ForumPost
                              id={forumContent?.id}
                              showButton
                              fullHeight={fullHeightItems}
                              buttonUrl={`/forum/${forumContent.slug}`}
                              truncateContent
                              gender={forumContent.user_gender}
                              image={parseImageURL(
                                forumContent?.user_image?.id
                              )}
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
                              comments={forumContent.comments?.length}
                              className="forum-post"
                              content={forumContent.content}
                            />
                          </div>
                          <div className="back z-10">
                            <ForumPost
                              id={forumContent?.id}
                              showButton
                              fullHeight={fullHeightItems}
                              buttonUrl={`/forum/${forumContent.slug}`}
                              truncateContent
                              gender={forumContent.user_gender}
                              image={parseImageURL(
                                forumContent?.user_image?.id
                              )}
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
                              comments={forumContent.comments?.length}
                              content={forumContent.content}
                              className="forum-post"
                              button={true}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                );
              case "blog":
                const blogContent = content as BlogType & {
                  home_show_top_data?: any;
                };
                return (
                  <>
                    {blogContent?.home_show_top_data === null && (
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
                              ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${blogContent.image.id}?width=700`
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
                    )}
                  </>
                );
              case "instagram":
                const instaContent = content as InstaPost & {
                  home_show_top_data: any;
                };

                return (
                  <>
                    {instaContent?.home_show_top_data === null && (
                      <motion.div
                        className={`grid-item grid-item-w-${item.width}`}
                        key={index}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                      >
                        <InstagramPost embed_code={instaContent.embed_code} />
                      </motion.div>
                    )}
                  </>
                );
              case "tiktok":
                // TODO: replace with CMS content
                const tiktokContent = content as TikTokPostProps & {
                  home_show_top_data: any;
                };

                return (
                  <>
                    {tiktokContent?.home_show_top_data === null && (
                      <motion.div
                        className={`grid-item grid-item-w-${item.width}`}
                        key={index}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                      >
                        <TikTokPost embed_code={tiktokContent.embed_code} />
                      </motion.div>
                    )}
                  </>
                );
              case "chat":
                // TODO: replace with CMS content
                const chatContent = content as any;

                return (
                  <>
                    {chatContent?.home_show_top_data === null && (
                      <motion.div
                        className={`grid-item grid-item-w-${item.width}`}
                        key={index}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                      >
                        {chatContent?.type === "blue" ? (
                          <ChatExampleBlue
                            convo={chatContent?.chat_buddy}
                            buddy={chatContent?.budy}
                            name={chatContent?.name}
                            age={chatContent?.age}
                          />
                        ) : (
                          <ChatExampleItem
                            convo={chatContent?.chat_buddy}
                            buddy={chatContent?.budy}
                            name={chatContent?.name}
                            age={chatContent?.age}
                          />
                        )}
                      </motion.div>
                    )}
                  </>
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

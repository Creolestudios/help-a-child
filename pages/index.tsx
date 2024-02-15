import { CircularProgress, Container } from "@mui/material";
import { Footer, Grid, Hero } from "../components/layout";
import { H4, P, TitleWithHighlights } from "../components/typography";
import {
  getContentTag,
  getFeed,
  getHomeData,
  getHomeTopPageData,
} from "../utils/api";
import { useCallback, useEffect, useState } from "react";

import ChevronRight from "../components/icons/ChevronRight/ChevronRight";
import { HomePageProps } from "../types/pageTypes";
import Image from "next/image";
import { MasonryGrid } from "../components/layout/MasonryGrid/MasonryGRid2";
import PageWrapper from "../components/layout/PageWrapper/PageWrappernew";
import TagList from "../components/buttons/TagList/TagList";
import TextWithHighlights from "../components/typography/TextWithHighlights";
import { generateFeedTiles } from "../utils/feed-utils";
import parseImageURL from "../utils/parseImageURL";
import { useCallbackWhenReachedBottom } from "../utils/scroll";
import ScrollDown from "../components/layout/ScrollDown/ScrollDown";

const POST_PER_PAGE = 6;

export const getServerSideProps = async () => {
  try {
    const pagetopReq = await getHomeTopPageData();
    const pageReq = await getHomeData();

    const categoriesReq = await getContentTag({
      filter: `filter[type][_eq]=main`,
    });

    const pageRes = await pageReq.json();

    const categoriesRes = await categoriesReq.json();

    const pagetopRes = await pagetopReq.json();
    const {
      blogsRes,
      instagramRes,
      tiktokRes,
      forumRes,
      lettersRes,
      videosRes,
      chatRes,
      tipsRes,
    } = await getFeed({ postPerPage: POST_PER_PAGE, meta: "filter_count" });
    return {
      props: {
        pageData: pageRes.data || null,
        feed: generateFeedTiles(
          {
            blogs: blogsRes.data,
            forum: forumRes.data,
            letters: lettersRes.data,
            instagram: instagramRes.data,
            tiktok: tiktokRes.data,
            videos: videosRes.data,
            chats: chatRes.data,
            tips: tipsRes.data,
          },
          true
        ),
        totalPosts:
          blogsRes.meta.filter_count +
            forumRes.meta.filter_count +
            lettersRes.meta.filter_count +
            instagramRes.meta.filter_count +
            videosRes.meta.filter_count +
            chatRes.meta.filter_count +
            tiktokRes.meta.filter_count +
            tipsRes.meta.filter_count || 0,
        pagetopRes: pagetopRes?.data,
        categories: categoriesRes.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

export default function Home({
  pageData,
  categories,
  feed,
  pagetopRes,
  totalPosts,
}: HomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(feed);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [showTags, setShowTags] = useState(false);
  useEffect(() => {
    if (selectedTag) {
      setCurrentPage(0);
    }
  }, [selectedTag]);
  const getAllFeedItem = useCallback(
    async ({
      append = false,
      selectedTag,
    }: {
      append: boolean;
      selectedTag: string;
    }) => {
      setIsLoading(true);

      try {
        const {
          blogsRes,
          instagramRes,
          tiktokRes,
          forumRes,
          lettersRes,
          videosRes,
          chatRes,
          tipsRes,
        } = await getFeed({
          postPerPage: POST_PER_PAGE,
          page: currentPage + 1,
          meta: "filter_count",
          filter:
            selectedTag.length > 0
              ? `filter[categories][categories_id][id][_eq]=${selectedTag}`
              : ``,
        });

        const res = generateFeedTiles(
          {
            blogs: blogsRes?.data ?? [],
            forum: forumRes?.data ?? [],
            letters: lettersRes?.data ?? [],
            instagram: instagramRes?.data ?? [],
            tiktok: tiktokRes?.data ?? [],
            videos: videosRes?.data ?? [],
            chats: chatRes?.data ?? [],
            tips: tipsRes?.data ?? [],
          },

          // generated first tiles only when its the first load
          false
        );

        if (append) {
          setPosts([...posts, ...res]);
        } else {
          setPosts(res);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, posts]
  );

  const handleScrollDown = async () => {
    if (posts.length < totalPosts && !selectedTag && !isLoading) {
      getAllFeedItem({ append: true, selectedTag: "" });
      setCurrentPage((page) => page + 1);
    }
    if (posts.length >= totalPosts) {
      setIsEnd(true);
    }
  };

  useEffect(() => {
    if (selectedTag) {
      getAllFeedItem({ append: false, selectedTag });
    } else {
      setPosts(feed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed, selectedTag]);

  return (
    <PageWrapper
      homepage={true}
      seo={{
        title: pageData?.seo_title,
        description: "Home",
        canonical: "http://localhost:3000",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : undefined,
      }}
    >
      <Hero
        center
        imageUrl={parseImageURL(pageData?.hero_image?.id, 1400)}
        style={{
          minHeight: 649,
          position: "relative",
        }}
        mbgn={parseImageURL(pageData?.mobile_hero_image?.id)}
        showTags={showTags}
      >
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} />
            <Grid item xs={12} md={8}>
              <div className="text-left sm:text-center">
                <TitleWithHighlights
                  text={"Volunteer A Child"}
                  color="white"
                  className="text-left items-center leading-[150%] sm:text-[46px] sm:text-center md:leading-[120%] lg:text-[80px] font-light"
                />
                <TextWithHighlights
                  color="white"
                  variant="light"
                  className="pt-4 sm:text-[18px] sm:pt-0  lg:text-[28px] w-max"
                  text={pageData?.page_subtitle ?? ""}
                  textToHighlight={pageData?.highlight_words ?? []}
                />
              </div>
            </Grid>
            <Grid item xs={0} md={2} />
          </Grid>
        </Container>
      </Hero>
      <main style={{ marginBottom: "80px" }}>
        <Container className="max-w-[1384px] px-[13px]">
          <div
            className={
              showTags
                ? "hidden"
                : "flex justify-center text-center mt-[-34px] relative mb-[100px] md:hidden"
            }
            onClick={() => setShowTags(true)}
          >
            <div
              className={
                "w-[320px] bg-[#3FC7B4] px-[20px] flex justify-center md:px-[50px] py-[16px] text-white text-[18px] rounded-[12px] cursor-pointer"
              }
            >
              {pageData?.tag_select_subject_title}
              <Image
                priority
                src={parseImageURL(pageData?.thumb_icon?.id)}
                alt="header icon"
                width={30}
                height={30}
                className="ml-[6px] mt-[-6px] -rotate-90"
              />
            </div>
          </div>
          <div
            className={
              showTags
                ? "mt-[-102px] relative mb-[50px] sm:mb-[48px] sm:mt-[-72px] md:block"
                : "mt-[-122px] relative mb-[50px] sm:mb-[48px] hidden sm:mt-[-72px] md:block"
            }
          >
            <Container className="max-w-[1384px]">
              <TagList
                tags={categories.map((cat) => ({
                  id: cat.id,
                  name: cat.name,
                  status: cat.status,
                }))}
                selected={selectedTag}
                prefix={
                  <H4
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    className="pr-[20px]"
                  >
                    <span
                      style={{ fontFamily: "Fjalla One" }}
                      className="md:hidden text-[16px] font-[400]"
                    >
                      {pageData?.tag_select_subject_title}
                    </span>
                    <span
                      style={{ fontFamily: "Fjalla One" }}
                      className="hidden md:block md:text-[28px] font-[400]"
                    >
                      {pageData?.tag_subject_title}
                    </span>
                    <Image
                      priority
                      src={parseImageURL(pageData?.thumb_icon?.id)}
                      alt="hand_icon"
                      width={30}
                      height={30}
                      className="md:-rotate-90"
                    />
                  </H4>
                }
                suffix={<ChevronRight />}
                onSelect={(x: string) => {
                  setSelectedTag(x);
                }}
              />
            </Container>
          </div>
        </Container>
        <MasonryGrid feed={posts} homepage={true} pagetopRes={pagetopRes} />
        {!isEnd && !isLoading && (
          <ScrollDown marginTop={94} onClick={handleScrollDown} />
        )}
        <div className="flex items-center justify-center">
          {isLoading && <CircularProgress size={"30px"} />}
          {isEnd && posts.length <= 0 && (
            <P color="info">{pageData?.loader_post_message}</P>
          )}
          {isEnd && posts.length > 0 && (
            <P color="info">{pageData?.loader_more_post_message}</P>
          )}
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}

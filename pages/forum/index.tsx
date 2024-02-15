import { Container, Grid } from "@mui/material";
import { H4, P, TitleWithHighlights } from "../../components/typography";
import { Hero, Pagination } from "../../components/layout";
import React, { useEffect, useState } from "react";
import {
  getContentTag,
  getForumOverviewPageData,
  getForumPosts,
} from "../../utils/api";

import Button from "../../components/buttons/Button";
import ChevronRight from "../../components/icons/ChevronRight/ChevronRight";
import { CircleSpinner } from "react-spinners-kit";
import { FORUM_POST_PER_PAGE } from "../../constants/app-configs";
import { ForumFlipWrapper } from "../../styles/global.styled";
import { ForumPageProps } from "../../types/pageTypes";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { HeroButtonWrapper } from "../../styles/kinderen/index.styles";
import Image from "next/image";
import Input from "../../components/form/Input/Input";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import SearchIcon from "../../components/icons/SearchIcon/SearchIcon";
import SortBar from "../../components/form/SortBar/SortBar";
import TagList from "../../components/buttons/TagList/TagList";
import parseImageURL from "../../utils/parseImageURL";

const forumSortOptions = [
  { name: "Titel (a-z)", value: "content" },
  { name: "Titel (z-a)", value: "-content" },
  { name: "Auteur (a-z)", value: "user_name" },
  { name: "Auteur (z-a)", value: "-user_name" },
  { name: "Datum (oud-nieuw)", value: "date_created" },
  { name: "Datum (nieuw-oud)", value: "-date_created" },
];

export const getServerSideProps = async () => {
  try {
    const pageReq = await getForumOverviewPageData();
    const tagsReq = await getContentTag({
      filter: `filter[type][_eq]=main`,
    });
    const forumReq = await getForumPosts({
      postPerPage: FORUM_POST_PER_PAGE,
      meta: "filter_count",
      filter: "date_created",
    });

    const pageRes = await pageReq.json();
    const forumRes = await forumReq.json();
    const tagsRes = await tagsReq.json();

    return {
      props: {
        pageData: pageRes.data || null,
        forumData: forumRes.data || null,
        totalPosts: forumRes.meta?.filter_count || null,
        tags: tagsRes.data || null,
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

export default function Forum({
  pageData,
  forumData,
  totalPosts,
  tags,
}: ForumPageProps) {
  const [posts, setPosts] = useState(forumData);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(totalPosts);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const changePage = (index: number) => {
    if (index <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(index);
    }
  };

  const handleSearch = (x: any) => {
    setSearch(x);
    setCurrentPage(1);
  };
  const handleSort = (x: string) => {
    setSort(x);
  };

  const getPaginatedPost = async () => {
    try {
      const req = await getForumPosts({
        postPerPage: FORUM_POST_PER_PAGE,
        page: currentPage,
        search,
        sort,
        meta: "filter_count",
        filter:
          selectedTag.length > 0
            ? `filter[categories][categories_id][id][_eq]=${selectedTag}`
            : ``,
      });
      const res = await req.json();
      setPosts(res.data ?? []);
      setTotalCount(res?.meta?.filter_count || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPaginatedPost();
  }, [currentPage, search, sort, selectedTag]);

  return (
    <PageWrapper
      seo={{
        title: pageData?.seo_title ? pageData?.seo_title : pageData?.page_title,
        description: "Forums",
        canonical: "http://localhost:3000/forum",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : "",
      }}
    >
      <Hero
        center
        imageUrl={parseImageURL(pageData?.hero_image?.id, 1400)}
        style={{
          minHeight: 649,
          position: "relative",
        }}
        mobileImageHeight={772}
      >
        <Container className="max-w-[1384px] mt-[40px] md:mt-[0]">
          <Grid container>
            <Grid item xs={12} md={10} className="w-[100%] mx-auto">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                color="white"
                className={
                  "text-[46px] font-[400] md:text-[64px] md:text-center sm:text-[46px]"
                }
              />
              <P
                color="white"
                variant="light"
                className={
                  "text-[16px] font-[300] leading-[160%] md:text-[18px] md:text-center"
                }
              >
                {pageData?.page_subtitle}
              </P>

              <HeroButtonWrapper className="mt-[40px] w-[100%] mx-auto md:w-[70%] md:flex gap-5">
                <Button
                  variant="success"
                  href="/stel-een-vraag"
                  className="forum-act px-[5px]  bg-[transparent]  border-[#fff] text-[#fff] hover:bg-[#06D6A0] hover:border-none text-[18px] font-[400]"
                >
                  {pageData?.submit_question_button_label}
                </Button>
                <Button
                  variant="infoReversed"
                  href="/ik-wil-een-buddy"
                  className="forum-act px-[5px] text-[18px] font-[400] bg-[transparent] border-[#fff] text-[#fff] hover:bg-[#06D6A0] hover:border-none"
                >
                  {pageData?.chat_button_label}
                </Button>
              </HeroButtonWrapper>
            </Grid>
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <div
          style={{
            marginBottom: 32,
            transform: "translateY(calc(-50% - 24px))",
          }}
        >
          <Container className="max-w-[1384px]">
            <TagList
              tags={tags}
              selected={selectedTag}
              prefix={
                <H4
                  style={{
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "5px",
                  }}
                  className="forum-tag"
                >
                  Onderwerp{" "}
                  <span
                    className={
                      "transform mt-[0px] rotate-[90deg] md:rotate-[0deg] md:mt-[-6px]"
                    }
                  >
                    👉🏾
                  </span>
                </H4>
              }
              suffix={<ChevronRight />}
              onSelect={(x: string) => {
                setSelectedTag(x);
                setCurrentPage(1);
              }}
            />
          </Container>
        </div>
        <Container className="max-w-[1384px] mt-[-90px] mx-[auto] md:mt-[0px] md:mb-[56px] px-[32px]">
          <Grid container spacing={"34px"}>
            <>
              <Grid item xs={12} md={9}>
                <P>
                  {totalCount} {totalCount === 1 ? "vraag" : "vragen"}
                </P>
              </Grid>
              <Grid item xs={12} md={3}>
                <SortBar sortOptions={forumSortOptions} onSort={handleSort} />
              </Grid>

              <Grid item xs={12} md={8}>
                <div className="flex flex-col h-[100%]">
                  <Image
                    src="/Imageforum.png"
                    alt="forum search"
                    fill
                    className="relative w-[100%] h-[121px] rounded-t-[8px]"
                  />
                  <div className="bg-[#FE517E] min-h-[264px] h-[100%] p-[24px] md:p-[32px] rounded-b-[8px]">
                    <div>
                      <TitleWithHighlights
                        text={pageData?.search_bar_quote || ""}
                        color="white"
                        className="text-[30px] font-[400]"
                      />
                      <div className="md:flex md:items-center">
                        <div className="w-[180px] text-[18px] text-[#fff]">
                          Doorzoek het forum:
                        </div>
                        <div className="mt-[20px] flex-1 md:mt-[0px]">
                          <Input
                            iconLeft={<SearchIcon />}
                            defaultValue={search}
                            placeholder={"Zoek in het forum.."}
                            onChange={handleSearch}
                            borderColor="primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              {isLoading ? (
                <CircleSpinner size={34} color="#fff" />
              ) : (
                <>
                  {posts?.map((item, index) => (
                    <ForumFlipWrapper
                      key={index}
                      item
                      xs={12}
                      md={4}
                      className="forum-card h-[400px] md:h-[540px]"
                    >
                      <div className="forum-content">
                        <div className="front">
                          <ForumPost
                            id={item.id}
                            truncateContent
                            fullHeight={false}
                            gender={item.user_gender}
                            age={item.user_age}
                            name={item.user_name}
                            image={item.user_image?.id || "asad"}
                            postDate={new Date(item.date_created)}
                            tags={
                              item.categories?.map(
                                (cat) => cat?.categories_id?.name
                              ) ?? []
                            }
                            title={
                              item.title ?? "Titel moet in CMS worden ingevoerd"
                            }
                            comments={item.comments.length}
                            content={item.content}
                            className="forum-post forum-list"
                            likesCount={item?.likes_count || 0}
                            commentsCount={item?.comments?.length || 0}
                            fetchData={getPaginatedPost}
                          />
                        </div>
                        <div className="back z-10">
                          <ForumPost
                            id={item.id}
                            truncateContent
                            fullHeight={false}
                            gender={item.user_gender}
                            age={item.user_age}
                            name={item.user_name}
                            image={item.user_image?.id || "asad"}
                            postDate={new Date(item.date_created)}
                            button={true}
                            tags={
                              item.categories?.map(
                                (cat) => cat.categories_id?.name
                              ) ?? []
                            }
                            title={
                              item.title ?? "Titel moet in CMS worden ingevoerd"
                            }
                            comments={item.comments.length}
                            content={item.content}
                            className="forum-post forum-list"
                            buttonUrl={`/forum/${item?.slug}`}
                            likesCount={item?.likes_count || 0}
                            commentsCount={item?.comments?.length || 0}
                          />
                        </div>
                      </div>
                    </ForumFlipWrapper>
                  ))}
                </>
              )}
            </>
          </Grid>
        </Container>
        {totalCount / FORUM_POST_PER_PAGE > 2 && (
          <Pagination
            total={Math.ceil(totalCount / FORUM_POST_PER_PAGE)}
            truncated
            onChange={changePage}
          />
        )}
      </main>
    </PageWrapper>
  );
}

import { Container, Grid } from "@mui/material";
import { H4, P, TitleWithHighlights } from "../../components/typography";
import { Hero, Pagination } from "../../components/layout";
import React, { useEffect, useState } from "react";
import { getContentTag, getPosts, getTips } from "../../utils/api";

import ChevronRight from "../../components/icons/ChevronRight/ChevronRight";
import ENDPOINTS from "../../constants/endpoints";
import Input from "../../components/form/Input/Input";
import { MasonryGrid } from "../../components/layout/MasonryGrid/MasonryGrid";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import SearchIcon from "../../components/icons/SearchIcon/SearchIcon";
import SortBar from "../../components/form/SortBar/SortBar";
import TagList from "../../components/buttons/TagList/TagList";
import parseImageURL from "../../utils/parseImageURL";
import { useTheme } from "styled-components";
import { v4 as uuidv4 } from "uuid";

export const getServerSideProps = async () => {
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/tips_overview_page?fields=*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const tagsReq = await getContentTag({
      filter: `filter[type][_eq]=main`,
    });
    const blogsReq = await getTips({
      postPerPage: POST_PER_PAGE,
      meta: "filter_count",
    });

    const pageRes = await pageReq.json();
    const blogRes = await blogsReq.json();
    const tagsRes = await tagsReq.json();
    return {
      props: {
        pageData: pageRes.data || null,
        blogsData: blogRes.data || null,
        totalPosts: blogRes.meta.filter_count || null,
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

export default function Tips({ pageData, blogsData, totalPosts, tags }: any) {
  const { colors } = useTheme();
  const [posts, setPosts] = useState(blogsData);
  const [totalCount, setTotalCount] = useState(totalPosts);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // useCallbackWhenReachedBottom(async () => {
  //   if (posts.length < totalCount) {
  //     setIsLoading(true);
  //     try {
  //       const req = await getPosts({
  //         postPerPage: POST_PER_PAGE,
  //         page: currentPage + 1,
  //         search,
  //         sort,
  //         meta: "filter_count",
  //         filter:
  //           selectedTag.length > 0
  //             ? `filter={"categories": { "categories_id": { "id": { "_eq": "${selectedTag}"}}}}`
  //             : ``,
  //       });
  //       const res = await req.json();

  //       setPosts([...posts, ...(res.data || [])]);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   } else {
  //     setIsEnd(true);
  //   }
  // });

  const handleSearch = (x: string) => {
    setSearch(x);
    setCurrentPage(1);
  };

  const handleSort = (x: string) => {
    setSort(x);
  };
  const changePage = (index: number) => {
    if (index <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(index);
    }
  };
  useEffect(() => {
    const getPaginatedBlogs = async () => {
      try {
        const req = await getTips({
          postPerPage: POST_PER_PAGE,
          // page: currentPage,
          search,
          sort,
          meta: "filter_count",
          filter:
            selectedTag.length > 0
              ? `filter={"_and":[{"categories": { "categories_id": { "id": { "_eq": "${selectedTag}"}}}}`
              : ``,
        });
        const res = await req.json();

        setPosts(res.data || []);
        setTotalCount(res.meta.filter_count || 0);
      } catch (error) {
        console.log(error);
        setTotalCount(0);
      }
    };

    getPaginatedBlogs();
  }, [search, sort, selectedTag]);
  return (
    <>
      <PageWrapper
        seo={{
          title: pageData?.seo_title,
          description: "Tips Detail",
          canonical: "http://localhost:3000/verhalen",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <Hero
          center
          imageUrl={
            pageData?.hero_image?.id
              ? parseImageURL(pageData?.hero_image?.id, 1400)
              : "/vrijwilligerswerkheader.png"
          }
          style={{
            minHeight: 649,
            position: "relative",
          }}
          mbgn={"/Header_Banner.png"}
          mobileImageHeight={740}
        >
          <Container>
            <Grid container className="custom_banner_content">
              <Grid item xs={0} md={2} lg={3} />
              <Grid item xs={12} md={8} lg={6}>
                <TitleWithHighlights
                  text={pageData?.title}
                  style={{
                    textAlign: "center",

                    fontSize: "64px",
                    fontWeight: "400",
                  }}
                  color="white"
                />
                <P
                  color="white"
                  variant="light"
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "300",
                    letterSpacing: "0.5px",
                  }}
                >
                  {pageData?.sub_title}
                </P>
                <div
                  style={{
                    display: "flex",
                    marginTop: "40px",

                    gap: "20px",
                  }}
                  className="custom_banner_form"
                >
                  <P style={{ color: "#fff", fontSize: "18px" }}>
                    Doorzoek de tips
                  </P>
                  <div
                    style={{ width: "60%" }}
                    className="custom_banner_formBox"
                  >
                    <Input
                      iconLeft={<SearchIcon color={"#fff"} />}
                      placeholder={pageData?.search_bar_quote}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={0} md={2} lg={3} />
            </Grid>
          </Container>
        </Hero>

        <main style={{ marginBottom: "0px" }}>
          <div
            style={{
              marginBottom: -40,
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
                  >
                    Onderwerp{" "}
                    <span
                      style={{
                        marginTop: "-6px",
                      }}
                    >
                      👉🏾
                    </span>
                  </H4>
                }
                suffix={<ChevronRight />}
                onSelect={(x: string) => {
                  if (x === selectedTag) {
                    setSelectedTag("");
                  } else {
                    setSelectedTag(x);
                  }
                }}
              />
            </Container>
          </div>
          {/* 
        <CollectionSearchBar
          quote={pageData?.search_bar_quote ?? ""}
          onSearch={handleSearch}
          searchLabel="Doorzoek de verhalen"
        /> */}

          <div style={{ margin: "0px auto" }}>
            <Container style={{ marginBottom: "0px", maxWidth: "1384px" }}>
              <Grid container>
                <Grid item xs={12} md={9}>
                  <P
                    style={{
                      color: colors.black.normal,
                      fontSize: "24px",
                      fontFamily: "Avenir",
                    }}
                  >
                    {totalCount} tips
                  </P>
                </Grid>
                <Grid item xs={12} md={3}>
                  <SortBar onSort={handleSort} />
                </Grid>
              </Grid>
            </Container>
            <MasonryGrid
              feed={posts.map((item: any) => ({
                id: `tip-${uuidv4()}`,
                type: "tip",
                width: 4,
                content: item,
              }))}
            />
          </div>

          <div className="flex items-center justify-center">
            {/* {isLoading && <CircularProgress size={"30px"} />} */}
            {posts?.lenght <= 0 && (
              <P style={{ marginLeft: "1rem" }} color="info">
                Geen posts om te tonen
              </P>
            )}
          </div>
          {totalCount / POST_PER_PAGE > 2 && (
            <div style={{ paddingBottom: "128px" }}>
              <Pagination
                total={Math.ceil(totalCount / POST_PER_PAGE)}
                truncated
                onChange={changePage}
              />
            </div>
          )}
        </main>
      </PageWrapper>
    </>
  );
}

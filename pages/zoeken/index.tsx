import { Grid } from "@mui/material";
import { H4, TitleWithHighlights } from "../../components/typography";
import React, { useEffect, useRef, useState } from "react";
import { getForumPosts, getLetters, getPosts } from "../../utils/api";
import { BlogType } from "../../types/content-types/Blog.type";
import { ForumPostType } from "../../types/forumTypes";
import { Hero } from "../../components/layout";
import { Letter } from "../../types/content-types/Letter.type";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import SearchResultItem from "../../components/content-types/SearchResultItem/SearchResultItem";
import { truncate } from "../../utils/truncate";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import parseImageURL from "../../utils/parseImageURL";
import TextWithHighlights from "../../components/typography/TextWithHighlights";
import SearchBarWrapper from "../../components/form/SearchBar/SearchBarWrapper";
import {
  ContainerWrapper,
  HeroBannerWrapper,
} from "../../styles/global.styled";
import BriefItem from "../../components/content-types/BriefItem/BriefItem";
import Link from "next/link";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { MasonryGrid } from "../../components/layout/MasonryGrid/MasonryGrid";

export default function Search() {
  const router = useRouter();

  const brievenRef = useRef(null);
  const blogRef = useRef(null);
  const forumRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);
  const [posts, setPosts] = useState<BlogType[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPostType[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const { q } = router.query;

  useEffect(() => {
    const getPaginatedBlogs = async () => {
      try {
        const req = await getPosts({
          postPerPage: POST_PER_PAGE,
          search: q as string,
        });
        const res = await req.json();

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getPaginatedForum = async () => {
      try {
        const req = await getForumPosts({
          postPerPage: POST_PER_PAGE,
          search: q as string,
        });
        const res = await req.json();

        setForumPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getPaginatedLetters = async () => {
      try {
        const req = await getLetters({
          postPerPage: POST_PER_PAGE,
          search: q as string,
        });
        const res = await req.json();

        setLetters(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (router.isReady) {
      getPaginatedBlogs();
      getPaginatedForum();
      getPaginatedLetters();
    }
  }, [q, router.isReady]);
  useEffect(() => {
    const blogItem = document.querySelector(".zoeken-blog");
    const forumItem = document.getElementById("zoeken-forum");
    const letterItem = document.getElementById("zoeken-letter");
    let allCardHeight = [];
    if (blogItem) {
      allCardHeight.push(blogItem?.clientHeight);
    }
    if (forumItem) {
      allCardHeight.push(forumItem?.clientHeight);
    }
    if (letterItem) {
      allCardHeight.push(letterItem?.clientHeight);
    }
    allCardHeight.length > 0 && setCardHeight(Math.max(...allCardHeight));
  });

  return (
    <PageWrapper
      seo={{
        title: "Zoeken",
        description: "Zoek hier naar blogs, forum posts en brieven.",
        canonical: "http://localhost:3000/zoeken",
      }}
    >
      <Hero
        center
        imageUrl={"/Zoeken-main.png"}
        style={{
          minHeight: 548,
          position: "relative",
        }}
        mbgn={"/Zoeken-mob.png"}
      >
        <HeroBannerWrapper className="zoeken-page">
          <div className="title-wrap max-w-4xl">
            <TitleWithHighlights
              text={`${
                posts?.length + forumPosts?.length + letters?.length
              } resultaten gevonden`}
              color="white"
              style={{
                fontFamily: "Fjalla One !important",
                fontSize: "80px",
                fontWeight: "400",
                marginBottom: "34px",
              }}
              className="title"
            />
            <TextWithHighlights
              color="white"
              variant="light"
              text={`Je hebt gezocht op 'zoekterm'`}
              textToHighlight={{ word: `'zoekterm'`, color: "#3FC7B4" }}
              className="search"
            />
          </div>
        </HeroBannerWrapper>
      </Hero>
      <main style={{ marginBottom: "80px" }}>
        <div
          style={{
            marginBottom: 0,
            transform: "translateY(calc(-50% - 24px))",
          }}
        >
          <ContainerWrapper className="lg-container px-[0]">
            <SearchBarWrapper
              prefix={
                <H4
                  className="text-[24px] font-[400] leading-[120%]"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Gebruik ander zoekwoord{" "}
                  <span
                    style={{
                      marginTop: "-6px",
                      width: "30px",
                    }}
                    className="hand-icon"
                  >
                    <img src="/Onderwerp.png" />
                  </span>
                </H4>
              }
            />
          </ContainerWrapper>
        </div>
        <ContainerWrapper
          className="zoeken lg-container"
          cardHeight={
            typeof cardHeight === "number" &&
            cardHeight > 100 &&
            (posts.length === 1 ||
              letters.length === 1 ||
              forumPosts.length === 1)
              ? cardHeight
              : "100%"
          }
        >
          <Grid container spacing={"22px"}>
            <Grid item xs={12} md={4} className="cardHeight">
              {posts.length === 1 ? (
                <div className="mt-[-15px]">
                  <MasonryGrid
                    feed={posts.map((item) => ({
                      id: `blog-${uuidv4()}`,
                      type: "blog",
                      width: 1,
                      content: { ...item },
                    }))}
                    className="zoeken-blog"
                  />
                </div>
              ) : (
                <SearchResultItem
                  colorVariant={1}
                  amount={posts?.length}
                  resultTitleSuffix={`in pagina's gevonden`}
                  list={posts?.map((post) => ({
                    name: post.title,
                    link: `/verhalen/${post.slug}`,
                  }))}
                  searchRef={blogRef}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4} className="cardHeight">
              {forumPosts.length == 1 ? (
                <div id="zoeken-forum">
                  <Link href={`/forum/${forumPosts[0].slug}`}>
                    <ForumPost
                      id={forumPosts[0]?.id}
                      truncateContent
                      fullHeight={false}
                      gender={forumPosts[0].user_gender}
                      age={forumPosts[0].user_age}
                      image={forumPosts[0].user_image?.id || "asad"}
                      name={forumPosts[0].user_name}
                      postDate={new Date(forumPosts[0].date_created)}
                      tags={
                        forumPosts[0].categories?.map(
                          (cat) => cat.categories_id?.name
                        ) ?? []
                      }
                      title={
                        forumPosts[0].title ??
                        "Titel moet in CMS worden ingevoerd"
                      }
                      comments={forumPosts[0].comments.length}
                      content={forumPosts[0].content}
                    />
                  </Link>
                </div>
              ) : (
                <SearchResultItem
                  amount={forumPosts?.length}
                  suffix={true}
                  colorVariant={2}
                  resultTitleSuffix={` in ons Forum`}
                  list={forumPosts?.map((post) => ({
                    name: truncate(post.content, 120),
                    link: `/forum/${post.slug}`,
                  }))}
                  searchRef={brievenRef}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4} className="cardHeight">
              {letters.length != 1 ? (
                <div id="zoeken-letter">
                  <BriefItem
                    key={letters[0]?.id}
                    category="Thema"
                    title={letters[0]?.title}
                    content={letters[0]?.description}
                    imgSrc={parseImageURL(letters[0]?.image?.id)}
                    fileSrc={`/open-brieven/${letters[0]?.slug}`}
                    bg={letters[0]?.bg_color}
                    imgHeight={180}
                  />
                </div>
              ) : (
                <SearchResultItem
                  colorVariant={3}
                  amount={letters?.length}
                  resultTitleSuffix={` in Brieven`}
                  list={letters?.map((post) => ({
                    name: post.title,
                    link: `/open-brieven/${post.slug}`,
                  }))}
                  searchRef={forumRef}
                />
              )}
            </Grid>
          </Grid>
        </ContainerWrapper>
      </main>
    </PageWrapper>
  );
}

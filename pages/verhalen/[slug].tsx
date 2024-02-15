import { H3, H6, P, TitleWithHighlights } from "../../components/typography";

import { BlogDetailPageProps } from "../../types/pageTypes";
import BlogItem from "../../components/content-types/BlogItem/BlogItem";
import CommentForm from "../../components/form/CommentForm/CommentForm";
import { Container } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { Hero } from "../../components/layout";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import Tag from "../../components/buttons/Tag/Tag";
import YoutubePlayer from "../../components/media/YoutubePlayer";
import { getPostDetail } from "../../utils/api";
import { parseDate } from "../../utils/parseDate";
import parseImageURL from "../../utils/parseImageURL";
import styled from "styled-components";

const StyledBlogContent = styled.article`
  padding: 16px;
  h2 {
    color: #150f2f;
    font-family: Fjalla One;
    font-size: 42px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    text-transform: uppercase;
    margin-bottom: 18px;
    margin-top: 64px;
  }
  p {
    font-family: "Avenir" !important;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: 160%;
    margin-bottom: 40px;
    color: #232323 !important;
  }
  img {
    margin-top: 64px;
    width: 100%;
  }
  .quot {
    background: #fe517e;
    border-radius: 8px;
  }
  .quote__content {
    position: relative;
    padding: 24px;
    font-family: Fjalla One !important;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: url("/chatBg.png");
      opacity: 0.2;
      background-size: 50%;
      background-position: left 225px top -75px;
      width: 100%;
      height: 100%;
    }
    h3,
    p {
      color: #fff !important;
      font-family: Fjalla One !important;
      text-transform: uppercase;
      strong {
        font-family: Fjalla One !important;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
        text-transform: uppercase;
      }
    }
  }
  .external {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: url("/chatBg.png");
      opacity: 0.2;
      background-size: 50%;
      background-position: left 225px top -75px;
      width: 100%;
      height: 100%;
    }
  }
`;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    // Get the letters
    const pageReq = await getPostDetail(slug as string);
    const { data } = await pageReq.json();
    return {
      props: {
        pageData: data[0] ?? null,
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

export default function BlogDetail({ pageData }: BlogDetailPageProps) {
  const generateMediaItem = () => {
    let Child = null;

    if (pageData?.youtube_embed) {
      Child = <YoutubePlayer src={pageData?.youtube_embed} />;
    }

    if (pageData?.type === "vlog" && pageData?.video?.id) {
      Child = (
        <video
          src={parseImageURL(pageData?.video.id)}
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
        />
      );
    } else if (pageData?.image?.id) {
      return parseImageURL(pageData?.image.id);
    }

    if (!Child) return;

    return (
      <div className="relative border overflow-hidden h-[50vh] rounded-[8px]">
        <>{Child}</>
      </div>
    );
  };

  return (
    <PageWrapper
      seo={{
        title: pageData?.title,
        description: "Blog Details",
        canonical: `http://localhost:3000/forum/${pageData?.slug}`,
        og: {
          type: "article",
          article: {
            publishedTime: pageData?.date_created,
            modifiedTime: pageData?.date_updated,
            authors: [pageData?.author ?? ""],
          },
        },
      }}
    >
      {/* <BreadCrumbs /> */}

      <main style={{ marginBottom: "80px" }}>
        <Hero
          center
          imageUrl={
            pageData?.image?.id
              ? parseImageURL(pageData?.image?.id, 1400)
              : "/verhalen.png"
          }
          style={{
            minHeight: 500,
            position: "relative",
          }}
          mbgn={"/verhalenmob.png"}
          mobileImageHeight={458}
        >
          <div className="flex flex-col items-center justify-center text-center max-w-3xl  mb-0">
            <Tag
              style={{ fontFamily: "Fjalla One" }}
              className="w-[max-content] pt-[10px] mb-[20px] text-[#3FC7B4] font-[400] text-[18px] bg-[#fff] border-[#fff] md:mb-[32px]"
            >
              Thema
            </Tag>
            <TitleWithHighlights
              highlightColor="info"
              text={`${pageData?.title}`}
              headerElement="h1"
              color="white"
              style={{
                fontFamily: "Fjalla One",
                fontStyle: `normal`,
                fontWeight: `400`,
                fontSize: `64px`,
                lineHeight: `140%`,
              }}
            />
            {/* <P
              style={{
                textAlign: "center",
                fontFamily: "Avenir",
                fontStyle: "normal",
                fontWeight: `300`,
                fontSize: `18px`,
                lineHeight: `160%`,
                color: `white`,
              }}
            ></P> */}
          </div>
        </Hero>

        <Container>
          <StyledBlogContent>
            {/* {!pageData?.image?.id && <div>{generateMediaItem()}</div>} */}

            <div className="content mt-[50px] mb-[90px]">
              <div
                dangerouslySetInnerHTML={{ __html: pageData?.content ?? "" }}
              />
              {pageData?.quote_content ? (
                <div className="quot">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pageData?.quote_content,
                    }}
                    className="quote__content"
                  />
                </div>
              ) : (
                ""
              )}
              {pageData?.after_quote_content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: pageData?.after_quote_content,
                  }}
                  className="after__quote__content"
                />
              ) : (
                ""
              )}
              {pageData?.author && pageData?.date_created ? (
                <div className="flex justify-between">
                  <H6 style={{ textTransform: "inherit" }}>
                    {pageData?.author}
                  </H6>
                  <P>{parseDate(new Date(pageData?.date_created))}</P>
                </div>
              ) : (
                ""
              )}
              {pageData?.external_links &&
              pageData?.external_links?.length > 0 ? (
                <div className="external bg-[#006EF7] p-[24px] rounded-[8px] z-10">
                  <H3 className="mb-[16px] relative z-[1]">Externe bronnen</H3>
                  {pageData?.external_links?.map((externalLink: string) => (
                    <div
                      key={externalLink}
                      className="w-full flex items-center relative z-[1]"
                    >
                      <Image
                        src={"/link.svg"}
                        width={20}
                        height={20}
                        className="h-[20px] w-[20px] mt-0"
                        alt="external links"
                      />{" "}
                      <Link
                        href={externalLink}
                        target="_blank"
                        className="px-[6px] text-[#fff] text-[18px] hover:cursor:pointer"
                      >
                        Link naar externe bron
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </StyledBlogContent>

          {pageData?.id && (
            <>
              <CommentForm
                comments={pageData?.comments}
                postId={pageData?.id}
                reactieClass="md:ml-[-24px]"
              />
              <CommentForm
                postId={pageData.id}
                formTitle={"Laat een reactie achter!"}
                formSubtitle="Herken jij je in dit verhaal, heb je een goeie tip of wil je iets delen? We horen het graag!"
                type="forum"
                submitLabel="Ja, ik wil mijn reactie plaatsen"
                style={{ margin: "0px", padding: "16px" }}
                reactieClass="md:ml-[-24px]"
              />
            </>
          )}
        </Container>

        {pageData?.related?.length && pageData?.related?.length > 0 ? (
          <section>
            <Container className="max-w-[1384px]">
              <div className="my-[100px]">
                <H3 variant="bold" style={{ margin: 0 }}>
                  Relevante blogs of vlogs
                </H3>
              </div>
            </Container>
            <Container className="max-w-[1384px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
                {pageData?.related.map((post) => (
                  <BlogItem
                    key={post.related_vlogposts_id?.id}
                    mediaSrc={
                      post.related_vlogposts_id?.image?.id
                        ? parseImageURL(post.related_vlogposts_id.image.id)
                        : ""
                    }
                    buttonText={"Blog lezen"}
                    embedSrc={post.related_vlogposts_id?.youtube_embed}
                    link={`/verhalen/${post.related_vlogposts_id?.slug}`}
                    type={post.related_vlogposts_id?.type}
                    author={post.related_vlogposts_id?.author}
                    description={post.related_vlogposts_id?.content}
                    postDate={new Date(post.related_vlogposts_id?.date_created)}
                    category={
                      post.related_vlogposts_id?.categories?.[0]?.categories_id
                        ?.name
                    }
                    title={post.related_vlogposts_id?.title}
                  />
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>
    </PageWrapper>
  );
}

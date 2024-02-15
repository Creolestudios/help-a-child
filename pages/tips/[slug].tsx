import { H6, P, TitleWithHighlights } from "../../components/typography";

import BreadCrumbs from "../../components/layout/BreadCrumbs/BreadCrumbs";
import { Container } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { Hero } from "../../components/layout";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import Tag from "../../components/buttons/Tag/Tag";
import { TipDetailPageProps } from "../../types/pageTypes";
import { getTipDetail } from "../../utils/api";
import { parseDate } from "../../utils/parseDate";
import parseHTMLtoReact from "../../utils/parseHTMLtoReact";
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
    const pageReq = await getTipDetail(slug as string);
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

export default function BlogDetail({ pageData }: TipDetailPageProps) {
  return (
    <PageWrapper
      seo={{
        title: pageData?.name,
        description: "Tips",
        canonical: `http://localhost:3000/tips/${pageData?.slug}`,
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
      <main style={{ marginBottom: "80px" }}>
        <BreadCrumbs />
        <Hero
          center
          imageUrl={"/verhalen.png"}
          style={{
            minHeight: 500,
            position: "relative",
          }}
          mbgn={"/verhalenmob.png"}
          mobileImageHeight={458}
        >
          <div className="flex flex-col items-center justify-center text-center max-w-3xl  mb-0">
            <div className="flex gap-3">
              {pageData?.categories?.map((cat, index) => (
                <Tag
                  key={index}
                  style={{ fontFamily: "Fjalla One" }}
                  className="w-[max-content] pt-[10px] mb-[20px] text-[#3FC7B4] font-[400] text-[18px] bg-[#fff] border-[#fff] md:mb-[32px]"
                >
                  {cat.categories_id?.name}
                </Tag>
              ))}
            </div>
            <TitleWithHighlights
              highlightColor="info"
              text={`${pageData?.name}`}
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
          </div>
        </Hero>

        <Container>
          <StyledBlogContent>
            <div className="content mt-[50px] mb-[90px]">
              {pageData && <div>{parseHTMLtoReact(pageData.content)}</div>}

              {pageData?.author && pageData?.date_created ? (
                <div className="flex justify-between mt-3">
                  <H6 style={{ textTransform: "inherit" }}>
                    Door: {pageData?.author}
                  </H6>
                  <P>
                    Geplaatst op: {parseDate(new Date(pageData?.date_created))}
                  </P>
                </div>
              ) : (
                ""
              )}
            </div>
          </StyledBlogContent>
        </Container>
      </main>
    </PageWrapper>
  );
}

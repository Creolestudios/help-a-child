import React, { ReactNode } from "react";

import BackToTopButton from "../../buttons/BackToTopButton/BackToTopButton";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import dynamic from "next/dynamic";
import styled from "styled-components";

const DynamicHeader = dynamic(() => import("../Header/Header"), {
  loading: () => <>Loading...</>,
});
const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  loading: () => <>Loading...</>,
});

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .page-content {
    flex: 1 0 auto;
  }

  footer {
    flex-shrink: 0;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    &:before {
      content: "";
      // background: url("/Hero-bg-left.png");
      background-repeat: repeat-y;
      background-size: 377px, 407px, auto;
      height: 100%;
      width: 377px;
      position: fixed;
      left: 0;
      top: 0;
      z-index: -1;
    }
    &:after {
      content: "";
      // background: url("/Hero-bg-right.png");
      background-repeat: repeat-y;
      background-position: right;
      background-size: 377px, 407px, auto;
      height: 100%;
      width: 377px;
      position: fixed;
      right: 0;
      top: 0;
      z-index: -1;
    }
  }
`;

const defaultValues = {
  title: "Help a Child",
  description:
    "Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Help a child op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen.",
  canonical: "http://localhost:3000/",
  image: "",
  ogtype: "website",
  oglocale: "nl_NL",
  ogurl: "http://localhost:3000/",
};

type SEOProps = {
  title: string | undefined;
  description: string | undefined;
  canonical: string | undefined;
  image?: string;
  og?: {
    type?: OpenGraph["type"];
    locale?: OpenGraph["locale"];
    url?: OpenGraph["url"];
    article?: OpenGraph["article"];
  };
};

type Props = {
  seo: SEOProps;
  children: ReactNode;
};

export default function PageWrapper({
  children,

  seo = {
    title: "Help a Child",
    description: defaultValues.description,
    canonical: defaultValues.canonical,
    image: defaultValues.image,
    og: {
      type: defaultValues.ogtype,
      locale: defaultValues.oglocale,
      url: defaultValues.ogurl,
    },
  },
}: Props) {
  return (
    <StyledWrapper>
      <NextSeo
        title={`HelpAChild`}
        description={seo.description}
        canonical={seo.canonical}
        openGraph={{
          title: seo.title,
          description: seo.description,

          images: seo.image
            ? [
                {
                  url: seo.image,
                  width: 800,
                  height: 600,
                  alt: "Help a child",
                },
              ]
            : undefined,
          type: seo.og?.type,
          locale: seo.og?.locale,
          url: seo.og?.url || seo.canonical,
          site_name: "Help a Child",
          article: seo.og?.article,
        }}
        twitter={{
          handle: "@helpAChild",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#006ef7" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta charSet="UTF-8"></meta>
      </Head>
      <DynamicHeader />
      <div className="page-content">{children}</div>
      <DynamicFooter />
      <BackToTopButton />
    </StyledWrapper>
  );
}

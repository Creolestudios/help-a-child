import { P, TitleWithHighlights } from "../../components/typography";

import Button from "../../components/buttons/Button";
import ENDPOINTS from "../../constants/endpoints";
import { Hero } from "../../components/layout";
import { HeroBannerWrapper } from "../../styles/global.styled";
import Link from "next/link";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import TextWithHighlights from "../../components/typography/TextWithHighlights";
import parseImageURL from "../../utils/parseImageURL";

export const getServerSideProps = async () => {
  // fetch page data from API
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteer_signup_page?fields=thanks_title,thanks_sub_title,thanks_hero_image.*,home_button_title,home_button_url`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const pageRes = await pageReq.json();
    if (!pageRes?.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        pageData: pageRes.data,
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

const Bedankt: React.FC<any> = (pageData) => {
  const {
    thanks_title,
    thanks_sub_title,
    thanks_hero_image,
    home_button_title,
    home_button_url,
  } = pageData?.pageData || {};

  return (
    <PageWrapper
      seo={{
        title: "Bedankt Pagina",
        description:
          "Je motivatie wordt doorgenomen. Je krijgt van ons bericht met de officiële uitnodiging op de basistraining!",
        canonical: "http://localhost:3000/bedankt-pagina",
      }}
    >
      <Hero
        center
        imageUrl={parseImageURL(thanks_hero_image?.id, 1400)}
        style={{
          minHeight: 754,
          position: "relative",
        }}
      >
        <HeroBannerWrapper className="zoeken-page">
          <div className="title-wrap max-w-5xl">
            <TitleWithHighlights
              text={"SUPER NICE THAT YOU HAVE REGISTERED AS A VOLUNTEER"}
              style={{
                textAlign: "center",
                margin: "0px",
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
                fontSize: "18px",
                maxWidth: "568px",
                fontWeight: "300",
                margin: "32px auto 44px",
              }}
            >
              {thanks_sub_title}
            </P>
            <Link href={home_button_url}>
              <Button
                style={{ fontFamily: "Fjalla One !important" }}
                variant="secondary"
                className="min-w-[320px] bg-[#3FC7B4] text-[18px] font-[400] text-[#fff] md:w-auto md:px-[64px] md:py-[16px]"
              >
                {home_button_title}
              </Button>
            </Link>
          </div>
        </HeroBannerWrapper>
      </Hero>
    </PageWrapper>
  );
};

export default Bedankt;

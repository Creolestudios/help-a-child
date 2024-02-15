import { P, TitleWithHighlights } from "../../components/typography";

import BriefItem from "../../components/content-types/BriefItem/BriefItem";
import Button from "../../components/buttons/Button";
import { Container } from "@mui/material";
import ENDPOINTS from "../../constants/endpoints";
import { Hero } from "../../components/layout";
import InfoCard from "../../components/content-types/InfoCard/InfoCard";
import { Letter } from "../../types/content-types/Letter.type";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import { getLetters } from "../../utils/api";
import parseImageURL from "../../utils/parseImageURL";

interface LettersOverviewPageProps {
  pageData: any;
  lettersDatas: Letter[];
  toplettersDatas: Letter[];
}

export const getServerSideProps = async () => {
  // ${ENDPOINTS.COLLECTIONS}/letters_overview_page?fields=*.*.*
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/letters_overview_page?fields=*.*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();
    const toplettersReq = await getLetters({
      postPerPage: POST_PER_PAGE,
      filter: `filter[id][_neq]=${pageRes?.data?.highlighted_letter?.id}`,
      letterFilter: `filter[_and][0][sort][_lt]=3`,
    });
    const lettersReq = await getLetters({
      postPerPage: POST_PER_PAGE,
      filter: `filter[id][_neq]=${pageRes?.data?.highlighted_letter?.id}`,
      letterFilter: `filter[_and][0][sort][_gt]=2`,
    });
    const toplettersRes = await toplettersReq.json();
    const lettersRes = await lettersReq.json();
    return {
      props: {
        pageData: pageRes.data,
        toplettersDatas: toplettersRes.data,
        lettersDatas: lettersRes.data,
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

const LettersOverviewPage: React.FC<LettersOverviewPageProps> = ({
  pageData,
  lettersDatas,
  toplettersDatas,
}) => {
  const toplettersData = toplettersDatas?.sort(
    (a: Letter, b: Letter) => a.sort - b.sort
  );
  const lettersData = lettersDatas?.sort(
    (a: Letter, b: Letter) => a.sort - b.sort
  );

  return (
    <div>
      <PageWrapper
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: "Open Letter",
          canonical: "http://localhost:3000/open-brieven",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <Hero
            center
            imageUrl={parseImageURL(pageData?.hero_image?.id, 1400)}
            style={{
              minHeight: 500,
              position: "relative",
            }}
            mobileImageHeight={572}
          >
            <div className="flex flex-col max-w-2xl md:items-center md:justify-center md:text-center md:max-w-4xl mb-0 mt-[-80px] md:mt-[-40px]">
              <TitleWithHighlights
                text={pageData?.page_title}
                headerElement="h1"
                color="white"
                style={{
                  fontFamily: "Fjalla One",
                  fontStyle: `normal`,
                  lineHeight: `140%`,
                }}
                className="text-[#fff] m-[0px] text-[46px] font-[400] md:text-[64px]"
              />
              <P
                style={{
                  textAlign: "center",
                  fontFamily: "Avenir",
                  fontStyle: "normal",
                  fontWeight: `300`,
                }}
                className="text-center text-[16px] text-[#fff] md:text-[22px] leading-[160%] m-[0]"
              >
                {pageData?.page_subtitle}
              </P>
            </div>
          </Hero>
          <section className="mb-20 mt-[-120px] relative">
            <Container maxWidth={`xl`}>
              <div className="block relative mt-[-250px] md:flex gap-10 md:mt-[-80px]">
                {toplettersData?.[0]?.sort === 1 && (
                  <>
                    {!toplettersData?.[0]?.description.includes("Vil") && (
                      <InfoCard
                        variant="blog"
                        imageUrl={parseImageURL(toplettersData?.[0]?.image?.id)}
                        title={toplettersData?.[0]?.title}
                        description={toplettersData?.[0]?.description}
                        icon={parseImageURL(pageData?.note_write_icon?.id)}
                        category={pageData?.intro_category}
                        className="small-fonts bg-[#FE517E] text-[#fff] h-[100%] flex flex-col mb-[40px] md:mb-[0]"
                      >
                        <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                          <Button
                            style={{ fontFamily: "Fjalla One" }}
                            variant="secondary"
                            className="w-[100%] text-[16px] font-[400] bg-[#fff] text-[#FE517E] border-[#fff] hover:bg-[#FE517E] md:text-[18px]"
                            href={`/open-brieven/${toplettersData?.[0]?.slug}`}
                          >
                            {pageData?.intro_button_label}
                          </Button>
                        </div>
                      </InfoCard>
                    )}
                  </>
                )}

                {toplettersData?.[1]?.sort === 2 && (
                  <InfoCard
                    variant="primary"
                    imageUrl={parseImageURL(toplettersData?.[1]?.image?.id)}
                    title={toplettersData?.[1]?.title}
                    description={toplettersData?.[1]?.description}
                    icon={parseImageURL(pageData?.note_write_icon?.id)}
                    category={
                      pageData?.highlighted_letter?.categories?.[0]?.name ||
                      null
                    }
                    className="small-fonts hover:bg-[#fff] text-[#fff] h-[100%] flex flex-col"
                  >
                    <div className="flex justify-center mt-[20px] md:mt-[auto]">
                      <Button
                        style={{ fontFamily: "Fjalla One" }}
                        variant="secondary"
                        className="w-[100%] text-[16px] font-[400] bg-[#fff] text-[#006EF7] border-[#fff] hover:bg-[#006EF7] md:text-[18px]"
                        href={`/open-brieven/${toplettersData?.[1]?.slug}`}
                      >
                        {pageData?.letter_for_button_label}
                      </Button>
                    </div>
                  </InfoCard>
                )}
              </div>
            </Container>
          </section>
          <section className="mt-[40px] md:mt-[64px] mb-[80px] md:mb-[128px]">
            <Container maxWidth="xl" className="open-brieven-font">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-20">
                {lettersData?.map((letter: Letter) => (
                  <BriefItem
                    category={letter.categories?.[0]?.categories_id?.name}
                    key={letter.id}
                    title={letter.title}
                    content={letter.description}
                    imgSrc={parseImageURL(letter.image?.id)}
                    fileSrc={`/open-brieven/${letter.slug}`}
                    bg={letter.bg_color}
                    imgHeight={180}
                  />
                ))}
              </div>
            </Container>
          </section>
        </main>
      </PageWrapper>
    </div>
  );
};

export default LettersOverviewPage;

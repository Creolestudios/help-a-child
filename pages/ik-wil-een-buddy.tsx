import {
  BuddymediaWrapper,
  ReflectiveCardWrapper,
} from "../styles/kinderen/kletsmeet.styles";
import { P, TitleWithHighlights } from "../components/typography";

import Button from "../components/buttons/Button";
import CommonDetailCard from "../components/content-types/CommonDetailCard/CommonDetailCard";
import { Container } from "@mui/material";
import { ContainerWrapper } from "../styles/Vrjwilligerswerk/index.styles";
import ENDPOINTS from "../constants/endpoints";
import FAQList from "../components/content-types/FAQList/FAQList";
import { Hero } from "../components/layout";
import InfoCard from "../components/content-types/InfoCard/InfoCard";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import VideoItem from "../components/content-types/VideoItem/VideoItem";
import { VideoWrapper } from "../styles/Vrjwilligerswerk/VrijwilligerWorden.styles";
import { parseFileURL } from "../utils/parseFileURL";
import parseImageURL from "../utils/parseImageURL";
import { useTheme } from "styled-components";

type BuddyPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/buddy_page?fields=*.*.*.*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();

    return {
      props: {
        pageData: pageRes.data || null,
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

const KletsMeetBuddyPage: React.FC<BuddyPageProps> = ({ pageData }) => {
  const { colors } = useTheme();

  return (
    <ContainerWrapper className="klets-meet">
      <PageWrapper
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: pageData?.seo_description
            ? pageData?.seo_description
            : pageData?.page_subtitle,
          canonical: "http://localhost:3000/ik-wil-een-buddy/",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <Hero
            center
            imageUrl={parseImageURL(
              pageData?.header_background_image?.id,
              1400
            )}
            style={{
              minHeight: 576,
              position: "relative",
            }}
            mobileImageHeight={572}
          >
            <div>
              <div className="text-left max-w-2xl md:max-w-4xl mt-[-80px] md:mt-[-120px] md:text-center">
                <TitleWithHighlights
                  text={pageData?.page_title}
                  style={{ marginBottom: "0px" }}
                  className="text-[#fff] text-[46px] font-[400] md:text-[64px]"
                />
                <P
                  style={{ marginBottom: "18px" }}
                  className="text-[#fff] text-[20px] leading-[160%] md:text-[18px]"
                >
                  More information about Help a child Buddy Program
                </P>
              </div>
              <div className="hidden md:flex justify-center">
                <Button
                  variant="success"
                  className="mr-[31px] w-auto py-4 px-16  mb-[10px] text-[18px] font-[400] bg-[transparent] text-[#fff] border-[#fff] hover:bg-[#fff] hover:text-[#3FC7B4]"
                  href={pageData?.cta_section_footer_ios_url}
                  target="_blank"
                >
                  {pageData?.header_button_1_label}
                </Button>
                <Button
                  variant="success"
                  className="bg-[transparent] w-auto py-4 px-16 text-[18px] font-[400] text-[#fff] border-[#fff] hover:bg-[#fff] hover:text-[#3FC7B4]"
                  href={pageData?.cta_section_footer_android_url}
                  target="_blank"
                >
                  {pageData?.header_button_2_label}
                </Button>
              </div>
            </div>
          </Hero>

          <BuddymediaWrapper>
            <Container>
              <div className="block relative mt-[-190px] md:flex gap-10 md:mt-[-80px]">
                {pageData?.media_items?.map((item: any, index: number) => {
                  return (
                    <>
                      {index === 0 && (
                        <InfoCard
                          variant="vlog"
                          imageUrl={parseImageURL(item?.image?.id)}
                          title={item?.title}
                          description={`If your parents are about to split up, have just split up or have been divorced for a while, you may feel the need to talk about this. That is possible at Help a child. We connect you to a Buddy for a listening ear.
                          A Buddy listens to what you have to say. A Buddy doesn't judge, so you can say anything you want. You can always text. A Buddy also has divorced parents and can help you with difficult questions.`}
                          icon={parseImageURL(item?.title_right_icon?.id)}
                          category={item?.categories?.[0]?.categories_id?.name}
                          className="small-fonts h-[100%] flex
                  flex-col"
                        >
                          <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                            {item?.button_label?.length && (
                              <Button
                                variant="secondary"
                                className="w-[100%] text-[18px] font-[400] bg-[#fff] text-[#FE517E] border-[#fff]"
                                href={item?.button_url}
                              >
                                {item?.button_label}
                              </Button>
                            )}
                          </div>
                        </InfoCard>
                      )}
                      {index === 1 && (
                        <InfoCard
                          variant="primary"
                          imageUrl={parseImageURL(item?.image?.id)}
                          title={item.title}
                          description={item?.description}
                          category={item?.categories?.[0]?.categories_id?.name}
                          icon={parseImageURL(item?.title_right_icon?.id)}
                          className="small-fonts mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                        >
                          <div className="flex justify-center mt-[20px] md:mt-[auto]">
                            <Button
                              variant="secondary"
                              className="w-[100%] text-[18px] font-[400] bg-[#fff] text-[#006EF7] border-[#fff]"
                              href={item.button_url}
                            >
                              {item?.button_label}
                            </Button>
                          </div>
                        </InfoCard>
                      )}
                    </>
                  );
                })}
              </div>
            </Container>
          </BuddymediaWrapper>
          <ReflectiveCardWrapper className="mt-[40px] md:mt-[141px]">
            <Container>
              <div className="flex flex-col text-center md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.buddy_help_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] md:text-[42px] font-[400]"
                />
                <P className="max-w-7xl text-[16px] md:text-[18px]">
                  {pageData?.buddy_help_section_subtitle}
                </P>
              </div>
            </Container>
            <Container>
              <div className="container-reflect flex flex-wrap">
                <CommonDetailCard
                  leftIcon={parseImageURL(
                    pageData?.buddy_help_1_image?.id,
                    100
                  )}
                  title={pageData?.buddy_help_1_title}
                  description={pageData?.buddy_help_1_description}
                  variant="info"
                  className="cursor-text"
                />
                <CommonDetailCard
                  leftIcon={parseImageURL(
                    pageData?.buddy_help_2_image?.id,
                    100
                  )}
                  title={pageData?.buddy_help_2_title}
                  description={pageData?.buddy_help_2_description}
                  variant="info"
                  className="cursor-text"
                />
                <CommonDetailCard
                  leftIcon={parseImageURL(
                    pageData?.buddy_help_3_image?.id,
                    100
                  )}
                  title={pageData?.buddy_help_3_title}
                  description={pageData?.buddy_help_3_description}
                  variant="info"
                  className="cursor-text"
                />
              </div>
            </Container>
          </ReflectiveCardWrapper>
          <VideoWrapper className="my-[136px]">
            <Container>
              <div className="flex flex-col md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.stories_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] max-w-3xl text-center md:text-[42px] font-[400]"
                />

                <P className="max-w-5xl text-[16px] md:text-[18px] text-center">
                  {pageData?.stories_section_subtitle}
                </P>
              </div>
            </Container>
            <Container>
              <div className="video-container flex flex-wrap">
                {pageData?.featured_stories?.map((feature_stories: any) => (
                  <VideoItem
                    key={feature_stories?.title}
                    title={feature_stories?.title}
                    poster={parseImageURL(
                      feature_stories?.video_cover_image?.id
                    )}
                    src={parseFileURL(feature_stories?.video_file?.id)}
                    subtitle={feature_stories.subtitle}
                    className="rounded-[10px]"
                  />
                ))}
              </div>
            </Container>
          </VideoWrapper>
        </main>
      </PageWrapper>
    </ContainerWrapper>
  );
};

export default KletsMeetBuddyPage;

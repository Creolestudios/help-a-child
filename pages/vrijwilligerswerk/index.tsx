import {
  FaqStyle,
  PeopleWrapper,
  VideoWrapper,
} from "../../styles/Vrjwilligerswerk/VrijwilligerWorden.styles";
import React, { useState } from "react";

import Button from "../../components/buttons/Button";
import CommonDetailCard from "../../components/content-types/CommonDetailCard/CommonDetailCard";
import { Container } from "@mui/material";
import { ContainerWrapper } from "../../styles/Vrjwilligerswerk/index.styles";
import ENDPOINTS from "../../constants/endpoints";
import FAQList from "../../components/content-types/FAQList/FAQList";
import { H3 } from "../../components/typography";
import { Hero } from "../../components/layout";
import { HeroBannerWrapper } from "../../styles/global.styled";
import InfoCard from "../../components/content-types/InfoCard/InfoCard";
import P from "../../components/typography/P/P";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import TitleWithHighlights from "../../components/typography/TitleWithHighlights";
import VideoItem from "../../components/content-types/VideoItem/VideoItem";
import VoulunteerWeek from "../../components/content-types/VolunteerWeek/VolunteerWeek";
import parseImageURL from "../../utils/parseImageURL";
import parseVideoURL from "../../utils/parseVideoURL";
import { useTheme } from "styled-components";
type VolunteersPageProps = {
  pageData: any;
  volunteerweekwork: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API
  try {
    const req = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_overview_page?fields=*.*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const volunteerweekreq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteer_week_work`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await req.json();
    const volunteerweekres = await volunteerweekreq.json();
    return {
      props: {
        pageData: res.data || null,
        volunteerweekwork: volunteerweekres?.data || null,
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

const VolunteersPage: React.FC<VolunteersPageProps> = ({
  pageData,
  volunteerweekwork,
}) => {
  const { colors } = useTheme();
  const [volunteerweek, setVolunteerWeek] = useState(volunteerweekwork);
  return (
    <ContainerWrapper className="volunteer overvies">
      <PageWrapper
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: "Volunteer",
          canonical: "http://localhost:3000/vrijwilligerswerk",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <Hero
            center
            imageUrl={parseImageURL(pageData?.header_image?.id, 1400)}
            style={{
              minHeight: 649,
              position: "relative",
            }}
            mbgn={parseImageURL(pageData?.mobile_hero_image?.id)}
            mobileImageHeight={740}
          >
            <HeroBannerWrapper className="volunteer overview">
              <div className="title-wrap max-w-2xl md:max-w-5xl">
                <TitleWithHighlights
                  highlightColor="info"
                  text={"BECOME A VOLUNTEER"}
                  headerElement="h1"
                  color="white"
                  className="header-title"
                />
                <P color="white" className="header-subtitle">
                  {pageData?.page_subtitle}
                </P>

                <div className="hidden gap-4 mt-14 w-[69%] md:flex md:mx-auto">
                  <Button
                    variant="success"
                    href="/vrijwilligerswerk/aanmelden"
                    className="overview-act px-[5px]  bg-[transparent]  border-[#fff] text-[#fff] hover:bg-[#06D6A0] hover:border-none text-[18px] font-[400]"
                  >
                    {pageData?.signup_button_label}
                  </Button>
                  <Button
                    variant="infoReversed"
                    href="/vrijwilligerswerk/trainingen"
                    className="overview-act px-[5px] text-[18px] font-[400] bg-[transparent] border-[#fff] text-[#fff] hover:bg-[#06D6A0] hover:border-none"
                  >
                    {pageData?.about_button_label}
                  </Button>
                </div>
              </div>
            </HeroBannerWrapper>
          </Hero>

          <section className="mb-[40px] md:mb-[80px]">
            <Container>
              <div className="block relative mt-[-120px] md:mt-[-80px] md:flex gap-10">
                <InfoCard
                  variant="ideal"
                  title={pageData?.cta_section_block_1_title}
                  description={pageData?.cta_section_block_1_subtitle}
                  icon="/handsake.svg"
                  className=" h-[100%] flex flex-col hover:cursor-text"
                >
                  <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#FE517E] text-[18px] font-[400] text-[#fff] mt-[20px]"
                      href={pageData?.cta_section_block_1_button_url}
                    >
                      {pageData?.cta_section_block_1_button_label}
                    </Button>
                  </div>
                </InfoCard>
                <InfoCard
                  variant="follow"
                  title={pageData?.cta_section_block_2_title}
                  description={
                    "We proud and grateful for the young people who work as Buddy for other children with divorced parents. Before you start, you will follow the basic training that prepares you for your volunteer work. We are also happy to invest in you by offering you multiple training courses, master classes, a family constellation and 1-on-1 coaching."
                  }
                  icon="/note.svg"
                  className="mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col hover:cursor-text"
                >
                  <div className="flex justify-center mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#3FC7B4] text-[18px] font-[400] text-[#fff] border-none"
                      href={pageData?.cta_section_block_2_button_url}
                    >
                      {pageData?.cta_section_block_2_button_label}
                    </Button>
                  </div>
                </InfoCard>
              </div>
            </Container>
          </section>

          <PeopleWrapper>
            <Container>
              <div className="flex flex-col md:text-center md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.usp_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] md:text-[42px] font-[400]"
                />
                <P className="max-w-4xl text-[300] sub-title">
                  {pageData?.usp_section_description}
                </P>
              </div>
            </Container>
            <Container>
              <div className="people-container flex flex-wrap">
                {pageData?.usps?.map(
                  (usp: any, index: number) =>
                    index !== 3 && (
                      <CommonDetailCard
                        key={usp.title}
                        title={usp?.title}
                        description={usp?.description}
                        imageUrl={parseImageURL(usp?.image?.id)}
                        variant="follow"
                        className="cursor-text volunteer-detail"
                      />
                    )
                )}
              </div>
            </Container>
          </PeopleWrapper>

          <section>
            <Container>
              <Container className="pl-[0] md:pl-[24px]">
                <div className="flex flex-col md:items-center md:justify-center mb-[20px] md:mb-14">
                  <TitleWithHighlights
                    text={
                      "WHAT CAN YOU EXPECT AFTER REGISTERING AS A VOLUNTEER"
                    }
                    headerElement="h3"
                    color="black"
                    className="text-[30px] md:text-[42px] font-[400]"
                  />
                </div>
              </Container>
              {globalThis.innerWidth < 768 ? (
                <div className="block md:hidden">
                  {volunteerweek?.map(
                    (volunteers: any, index: number) =>
                      index < 5 && (
                        <VoulunteerWeek
                          key={volunteers.id}
                          title={volunteers.title}
                          data={volunteers.description_list}
                          id={volunteers.id}
                          name={`week${index + 1}`}
                          volunteerweek={volunteerweek}
                          setVolunteerWeek={setVolunteerWeek}
                        />
                      )
                  )}
                </div>
              ) : (
                <>
                  <div className="hidden md:flex justify-between md:pb-[50px] top-block">
                    <VoulunteerWeek
                      title={volunteerweek?.[0].title}
                      data={volunteerweek?.[0].description_list}
                      id={volunteerweek?.[0].id}
                      className="top"
                      name="week1"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                    <VoulunteerWeek
                      title={volunteerweek?.[2].title}
                      data={volunteerweek?.[2].description_list}
                      id={volunteerweek?.[2].id}
                      className="top"
                      name="week2"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                    <VoulunteerWeek
                      title={volunteerweek?.[4].title}
                      data={volunteerweek?.[4].description_list}
                      id={volunteerweek?.[4].id}
                      className="top"
                      name="week2"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                  </div>
                  <div className="hidden md:flex w-[100%] h-[88px] bg-[#FFECF1] justify-center items-center px-[34px]">
                    <div className="w-[100%] px-[50px] text-red h-[3px] bg-[#FE517E]/[25%]">
                      <div className="inner"></div>
                    </div>
                  </div>

                  <div className="hidden md:flex justify-around md:pt-[50px] bottom-block">
                    <VoulunteerWeek
                      title={volunteerweek?.[1]?.title}
                      data={volunteerweek?.[1]?.description_list}
                      id={volunteerweek?.[1]?.id}
                      className="bottom ml-[100px]"
                      name="week4"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                    <VoulunteerWeek
                      title={volunteerweek?.[3].title}
                      data={volunteerweek?.[3].description_list}
                      id={volunteerweek?.[3].id}
                      className="bottom mr-[100px]"
                      name="week5"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                  </div>
                </>
              )}
            </Container>
          </section>
          <section className="my-[40px] md:my-[80px]">
            <Container>
              <div className="block relative md:flex gap-10">
                <InfoCard
                  variant="ideal"
                  title={pageData?.about_1_title}
                  icon={
                    pageData.about_1_training_icon
                      ? parseImageURL(pageData?.about_1_training_icon?.id)
                      : ""
                  }
                  className="about-training h-[100%] flex flex-col"
                >
                  <div className="flex justify-center">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#FE517E] text-[18px] font-[400] text-[#fff] border-[#fff]"
                      href={pageData?.button_1_url}
                    >
                      {pageData?.button_1_title}
                    </Button>
                  </div>
                </InfoCard>
                <InfoCard
                  variant="follow"
                  title={pageData?.about_2_title}
                  icon={
                    pageData.about_2_training_icon
                      ? parseImageURL(pageData?.about_2_training_icon?.id)
                      : ""
                  }
                  className="about-training mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#3FC7B4] text-[18px] font-[400] text-[#fff] border-[#fff]"
                      href={pageData?.button_2_url}
                    >
                      {pageData?.button_2_title}
                    </Button>
                  </div>
                </InfoCard>
              </div>
            </Container>
          </section>
          <VideoWrapper className="my-[40px] md:my-[80px]">
            <Container>
              <div className="flex flex-col items-center justify-center mb-6 md:mb-14 title">
                <TitleWithHighlights
                  text={pageData?.video_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] m:text-[42px] font-[400]"
                />

                <P className="max-w-4xl font-[300] sub-title">
                  Demi, Anouk, Arne, Kaylee en Ivo zijn vrijwilliger. Benieuwd
                  hoe zij dit ervaren? Ze vertellen je er graag meer over.
                </P>
              </div>
            </Container>
            <Container>
              <div className="video-container flex flex-wrap">
                {pageData?.video_items?.map(
                  (storyvideo: any, index: number) => (
                    <VideoItem
                      key={storyvideo?.title}
                      title={storyvideo?.title}
                      poster={
                        index === 0
                          ? parseImageURL(storyvideo?.video_cover_image?.id)
                          : index === 1
                          ? parseImageURL(storyvideo?.video_cover_image?.id)
                          : parseImageURL(storyvideo?.video_cover_image?.id)
                      }
                      src={parseVideoURL(storyvideo?.video_file?.id)}
                      subtitle={storyvideo?.subtitle}
                    />
                  )
                )}
              </div>
            </Container>
          </VideoWrapper>
        </main>
      </PageWrapper>
    </ContainerWrapper>
  );
};

export default VolunteersPage;

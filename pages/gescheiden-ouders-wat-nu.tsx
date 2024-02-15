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
  pageDat: any;
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/divorced_parents_now_what?fields=*.*.*`,
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

const GescheidenOudersWatNu: React.FC<BuddyPageProps> = ({ pageData }) => {
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
          canonical: "#",
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
              minHeight: 576,
              position: "relative",
            }}
            mobileImageHeight={572}
          >
            <div>
              <div className="text-left max-w-2xl md:max-w-4xl mt-[-80px] md:mt-[-120px] md:text-center">
                <TitleWithHighlights
                  text={pageData.title}
                  style={{ marginBottom: "0px" }}
                  className="text-[#fff] text-[46px] font-[400] md:text-[64px]"
                />
                <P
                  style={{ marginBottom: "18px" }}
                  className="text-[#fff] text-[20px] leading-[160%] md:text-[18px]"
                >
                  {pageData.sub_title}
                </P>
              </div>
            </div>
          </Hero>

          <BuddymediaWrapper>
            <Container>
              <div className="block relative mt-[-190px] md:flex gap-10 md:mt-[-80px]">
                <InfoCard
                  variant="blog"
                  imageUrl={parseImageURL(pageData?.media_image?.id)}
                  title={pageData?.media_title}
                  description={pageData?.media_description}
                  icon={"/letterBlog.png"}
                  className="small-fonts bg-[#FE517E] text-[#fff] h-[100%] flex flex-col mb-[40px] md:mb-[0]"
                >
                  <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                    <Button
                      style={{ fontFamily: "Fjalla One" }}
                      variant="secondary"
                      className="w-[100%] text-[16px] font-[400] bg-[#fff] text-[#FE517E] border-[#fff] hover:bg-[#FE517E] md:text-[18px]"
                      href={pageData?.media_button_link}
                    >
                      {pageData?.media_button_title}
                    </Button>
                  </div>
                </InfoCard>
                <InfoCard
                  variant="primary"
                  imageUrl={parseImageURL(pageData?.media_2_image?.id)}
                  title={pageData?.media_2_title}
                  description={pageData?.media_2_description}
                  icon={"/letterBlog.png"}
                  className="small-fonts mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] text-[18px] font-[400] bg-[#fff] text-[#006EF7] border-[#fff]"
                      href={pageData?.media_2_button_link}
                    >
                      {pageData?.media_2_button_title}
                    </Button>
                  </div>
                </InfoCard>
              </div>
            </Container>
          </BuddymediaWrapper>
          <ReflectiveCardWrapper className="mt-[40px] md:mt-[141px]">
            <Container>
              <div className="flex flex-col md:text-center md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.info_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] md:text-[42px] font-[400]"
                />
                <P className="max-w-7xl text-[16px] md:text-[18px]">
                  {pageData?.info_sub_title}
                </P>
              </div>
            </Container>
            <Container>
              <div className="container-reflect flex flex-wrap">
                {pageData?.info_blocks?.map((ite: any) => (
                  <CommonDetailCard
                    key={ite.info_title}
                    title={ite.info_title}
                    description={ite?.info_subtitle}
                    variant="info"
                    button={ite.info_button_title}
                    buttonLink={ite.info_button_url}
                    className="divorced-parents"
                  />
                ))}
              </div>
            </Container>
          </ReflectiveCardWrapper>
          <VideoWrapper className="my-[136px]">
            <Container>
              <div className="flex flex-col md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.video_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] max-w-3xl md:text-center md:text-[42px] font-[400]"
                />

                <P className="max-w-5xl text-[16px] md:text-[18px] md:text-center">
                  {pageData?.video_section_sub_title}
                </P>
              </div>
            </Container>
            <Container>
              <div className="video-container flex flex-wrap">
                {pageData?.featured_video?.map((feature_video: any) => (
                  <VideoItem
                    key={feature_video?.title}
                    title={feature_video?.title}
                    poster={parseImageURL(feature_video?.video_cover_image?.id)}
                    src={parseFileURL(feature_video?.video_file?.id)}
                    subtitle={feature_video.subtitle}
                    className="rounded-[10px]"
                  />
                ))}
              </div>
            </Container>
          </VideoWrapper>
          <section className="mb-[80px] mt-[-40px] md:mt-[0px]">
            <FAQList
              title={pageData?.faq_section_title}
              items={pageData?.featured_faqs.slice(0, 3)}
              show={true}
            />
            <Container
              style={{ marginBottom: 145, marginTop: -24 }}
              className="mt-2 hidden sm:block"
            >
              <div className="mt-[20px] flex justify-center mb-6 md:mt-14 ">
                <Button
                  variant="link"
                  style={{
                    color: colors.info.normal,
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                  href="/faqs/volunteer_faq"
                  className="w-[100%] bg-[#3FC7B4] text-[#fff] no-underline hover:underline"
                >
                  {pageData?.more_faq_button_title}
                </Button>
              </div>
            </Container>
          </section>
        </main>
      </PageWrapper>
    </ContainerWrapper>
  );
};

export default GescheidenOudersWatNu;

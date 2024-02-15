import { P, TitleWithHighlights } from "../../../components/typography";

import ENDPOINTS from "../../../constants/endpoints";
import { Hero } from "../../../components/layout";
import { HeroBannerWrapper } from "../../../styles/global.styled";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import SignupStepperForm from "../../../components/layout/SignupStepperForm";
import { TrainigenHeroWrapper } from "../../../styles/Vrjwilligerswerk/TrainigenWrapper.styles";
import parseImageURL from "../../../utils/parseImageURL";

type VolunteersSignupPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteer_signup_page?fields=*.*.*`,
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

const VolunteersFAQPage: React.FC<VolunteersSignupPageProps> = ({
  pageData,
}) => {
  return (
    <div>
      <PageWrapper
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: "Registration",
          canonical: "http://localhost:3000/vrijwilligerswerk/buddy-programma",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main className="mai">
          <TrainigenHeroWrapper>
            <Hero
              center
              imageUrl={parseImageURL(pageData?.hero_image?.id, 1400)}
              style={{
                minHeight: 554,
                position: "relative",
              }}
              mobileImageHeight={564}
              mbgn={parseImageURL(pageData?.mobile_hero_image?.id)}
            >
              <HeroBannerWrapper>
                <div className="title-wrap max-w-2xl md:max-w-4xl">
                  <TitleWithHighlights
                    headerElement="h1"
                    color="white"
                    highlightColor="info"
                    text={pageData?.page_title}
                    className="title"
                  />
                  <P className="subtitle">{pageData?.page_subtitle}</P>
                </div>
              </HeroBannerWrapper>
            </Hero>
          </TrainigenHeroWrapper>
          <section className="aanmelden-stepper-wrapper mb-[80px] mx-[40px] md:mb-[128px]">
            <SignupStepperForm />
          </section>
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersFAQPage;

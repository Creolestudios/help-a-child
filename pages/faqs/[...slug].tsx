import { P, TitleWithHighlights } from "../../components/typography";
import { getFaqOverviewData, getFaqs } from "../../utils/api";
import { ContainerWrapper } from "../../styles/Vrjwilligerswerk/index.styles";
import FAQList from "../../components/content-types/FAQList/FAQList";
import { Hero } from "../../components/layout";
import { HeroBannerWrapper } from "../../styles/global.styled";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import { VolunteersFAQPageProps } from "../../types/pageTypes";
import parseImageURL from "../../utils/parseImageURL";
import { useState } from "react";

const POST_PER_PAGE = 7;

export const getServerSideProps = async (context: any) => {
  const { slug } = context?.params || {};
  try {
    const pageReq = await getFaqOverviewData();
    const faqReq = await getFaqs({
      meta: "filter_count",
      type: slug,
    });

    const pageRes = await pageReq.json();
    const faqRes = await faqReq.json();

    return {
      props: {
        pageData: pageRes.data || null,
        faqData: faqRes.data || null,
        totalFaqs: faqRes?.meta?.filter_count ?? 0,
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

const VolunteersFAQPage: React.FC<VolunteersFAQPageProps> = ({
  pageData,
  faqData,
  totalFaqs,
}) => {
  const [items, setItems] = useState(faqData);
  const [totalCount, setTotalCount] = useState(totalFaqs);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const showMoreButton =
    totalCount > items.length && totalCount > POST_PER_PAGE;

  return (
    <PageWrapper
      seo={{
        title: pageData?.seo_title ? pageData?.seo_title : pageData?.page_title,
        description: pageData?.seo_description
          ? pageData?.seo_description
          : pageData?.page_subtitle,
        canonical: "http://localhost:3000/vrijwilligerswerk",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : "",
      }}
    >
      <main className="mb-[128px]">
        <Hero
          imageUrl={parseImageURL(pageData?.background_image?.id, 1400)}
          style={{
            minHeight: 455,
            position: "relative",
          }}
          mobileImageHeight={468}
        >
          <HeroBannerWrapper>
            <div className="title-wrap max-w-2xl md:max-w-4xl">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                textToHighlight="vrijwilligers"
                headerElement="h1"
                style={{
                  fontFamily: "Fjalla One",
                  fontStyle: `normal`,
                  fontWeight: `400`,
                  color: `white`,
                }}
                className="title mt-[180px] md:mt-[80px]"
              />
              <P className="font-avenir subtitle">{pageData?.page_subtitle}</P>
            </div>
          </HeroBannerWrapper>
        </Hero>
        <ContainerWrapper className="volunteer-faq mt-[80px] md:mt-[120px]">
          <div className="relative"></div>
        </ContainerWrapper>
      </main>
    </PageWrapper>
  );
};

export default VolunteersFAQPage;

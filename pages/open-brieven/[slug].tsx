import { Document, Page, pdfjs } from "react-pdf";
import { H3, P, TitleWithHighlights } from "../../components/typography";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  getComments,
  postLetterDownload,
  postLetterSubscription,
} from "../../utils/api";

import BreadCrumbs from "../../components/layout/BreadCrumbs/BreadCrumbs";
import BriefItem from "../../components/content-types/BriefItem/BriefItem";
import CommentForm from "../../components/form/CommentForm/CommentForm";
import { Container } from "@mui/material";
import ENDPOINTS from "../../constants/endpoints";
import { GetServerSidePropsContext } from "next";
import { Hero } from "../../components/layout";
import { Letter } from "../../types/content-types/Letter.type";
import { LetterDownloadType } from "../../types/forumTypes";
import LetterForm from "../../components/form/LetterForm/LetterForm";
import { LetterFormWrapper } from "../../styles/kinderen/index.styles";
import LetterForyou from "../../components/content-types/LetterForyou/LetterForyou";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Tag from "../../components/buttons/Tag/Tag";
import { parseFileURL } from "../../utils/parseFileURL";
import parseImageURL from "../../utils/parseImageURL";
import styled from "styled-components";

type Props = {
  pageData: Letter & { sub_title?: string; hero_description?: string };
  relatedLetters: Letter[];
  pageoverview: any;
  comments: any;
};
const PdfViewContainer = styled.div`
  .react-pdf__Page__textContent.textLayer {
    display: none !important;
  }

  .react-pdf__Page__annotations.annotationLayer {
    display: none !important;
  }
  display: flex;
  justify-content: center;
  @media (max-width: 1200px) {
    display: block;
    canvas {
      margin: 0 auto;
    }
  }
`;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    const pageoverviewReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/letters_overview_page?fields=*.*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const pageoverviewRes = await pageoverviewReq.json();
    // Get the letters
    // ${ENDPOINTS.COLLECTIONS}/open_letters?filter[slug][_eq]=${slug}&fields=*.*&
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/open_letters?filter[slug][_eq]=${slug}&fields=*.*.*`,
      {
        method: "GET",
      }
    );
    // ${ENDPOINTS.COLLECTIONS}/open_letters?fields=*.*.*&filter[status][_eq]=published
    const lettersReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/open_letters?fields=*.*.*&filter[status][_eq]=published`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await res.json();
    const { data: letters } = await lettersReq.json();
    if (!data?.[0]) {
      return {
        notFound: true,
      };
    }
    const commentReq = await getComments("open_letter", data[0].id);
    const commmentRes = await commentReq.json();
    // shuffle letters
    const randomizedLetters = letters
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return {
      props: {
        pageoverview: pageoverviewRes.data,
        pageData: data[0] ?? null,
        relatedLetters: randomizedLetters,
        comments: commmentRes.data ?? null,
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

export default function LetterDetail({
  pageoverview,
  pageData,
  relatedLetters,
  comments,
}: Props) {
  const {
    formState: { errors },
  } = useForm<LetterDownloadType>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [letterPdfMessage, setLetterPdfMessage] = useState("");
  const downloadFile = async (data: any) => {
    try {
      await postLetterDownload({
        document_id: pageData.id,
        document_title: pageData?.detail_title,
        document_type: "open_letter",
        subject_type: "Letter",
        user_name: data?.user_name,
        user_email: data?.user_email,
        user_residence: data?.residence,
        monthly_tips_and_inspiration_email: data?.tips_inspiration_email,
      });
      setIsSubmitted(true);
      setLetterPdfMessage("Bedankt! De brief opent in een nieuw scherm.");
      window.open(parseFileURL(pageData.downloadable_document?.id), "_blank");
    } catch (err) {
      console.log(err);
    }
  };
  const submitForm = async (data: any) => {
    if (pageData?.requires_signup) {
      try {
        const body = {
          user_name: data?.user_name,
          user_city: data?.user_city,
          letter: {
            id: pageData.id,
          },
        };
        await postLetterSubscription(body);

        // download downloadable document
        if (pageData?.downloadable_document) {
          downloadFile(data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // download downloadable document
      if (pageData?.downloadable_document) {
        downloadFile(data);
      } else {
        setIsSubmitted(true);
        setLetterPdfMessage("Van deze brief is geen pdf beschikbaar");
      }
    }
  };
  const onSubmit: SubmitHandler<any> = async (data) => {
    submitForm(data);
  };
  useEffect(() => {
    if (pageData.slug === "zelf-een-brief-schrijven") {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }
  }, []);
  return (
    <PageWrapper
      seo={{
        title: pageData.title,
        description: "Open Letter Detail",
        canonical: `http://localhost:3000/forum/${pageData?.slug}`,
        og: {
          type: "article",
          article: {
            publishedTime: pageData.date_created,
            modifiedTime: pageData.date_updated,
            authors: ["Help a child"],
            tags: pageData.categories?.map((cat) => cat.categories_id?.name),
          },
        },
      }}
    >
      <BreadCrumbs />
      <Hero
        center
        imageUrl={parseImageURL(pageoverview?.hero_image?.id, 1400)}
        style={{
          minHeight: 476,
          position: "relative",
        }}
        mobileImageHeight={772}
      >
        <div className="flex flex-col md:items-center md:justify-center md:text-center max-w-2xl md:max-w-5xl md:my-16 mt-10">
          <Tag
            style={{ fontFamily: "Fjalla One" }}
            className="w-[max-content] pt-[10px] mb-[20px] text-[#3FC7B4] font-[400] text-[18px] bg-[#fff] border-[#fff] md:mb-[32px]"
          >
            Open brief
          </Tag>
          <TitleWithHighlights
            text={pageData?.detail_title}
            headerElement="h1"
            color="white"
            className="text-[42px] font-[400] md:text-[64px]"
          />
          {pageData?.sub_title ? (
            <P
              color="white"
              variant="light"
              className={
                "text-[16px] font-[300] leading-[160%] md:text-[18px] md:text-center"
              }
            >
              {pageData?.sub_title}
            </P>
          ) : (
            ""
          )}
        </div>
      </Hero>
      <section className="my-[128px] md:my-[128px]">
        <Container>
          {pageData?.hero_description ? (
            <P
              color="black"
              variant="light"
              className={"text-[16px] font-[300] leading-[160%] md:text-[18px]"}
            >
              {pageData?.hero_description}
            </P>
          ) : (
            ""
          )}
        </Container>
        <Container>
          {pageData.slug === "zelf-een-brief-schrijven" ? (
            <PdfViewContainer>
              <Document
                file={parseFileURL(pageData?.downloadable_document?.id)}
              >
                <Page pageNumber={1} className={"text-center"}>
                  1
                </Page>
              </Document>
              <Document
                file={parseFileURL(pageData?.downloadable_document?.id)}
              >
                <Page pageNumber={2} className={"text-center"}>
                  2
                </Page>
              </Document>
            </PdfViewContainer>
          ) : (
            <LetterForyou
              letter_for_you={pageData?.letter_for_you}
              middle_colored_letter_for_you={
                pageData?.middle_colored_letter_for_you
              }
              bottom_letter_for_you={pageData?.bottom_letter_for_you}
            />
          )}
        </Container>
      </section>
      <main className="px-[8px] mb-[100px]  md:px-[0] md:mb-[140px] md:mt-[128px]">
        <CommentForm
          type="open_letter"
          comments={comments}
          preText="De Buddy’s beantwoorden alle vragen. Zij zaten in eenzelfde situatie
          als jij en hebben dus heel veel wijze raad. Maar niet alleen
          Budd's weten hoe het voelt om gescheiden ouders te hebben, jij
          ook! Heb jij een goede tip? Deel 'm hieronder!"
          postId={pageData.id}
        />
        <LetterFormWrapper className="my-[80px]">
          <Container className="block max-w-[1385px] p-[0px] md:flex">
            <CommentForm
              formTitle={pageoverview?.comment_form_title}
              formSubtitle={pageoverview?.comment_form_subtitle}
              type="open_letter"
              postId={pageData.id}
              className="bg-[#FE517E]"
              submitLabel="Reageer op deze brief"
              commentFormType="open_letter"
            />
            {isSubmitted ? (
              <div className="flex flex-col w-[100%] rounded-[10px] items-center justify-center px-[32px] py-[50px] bg-[#ff971d] h-[100%] text-[#fff] font-[400]">
                <H3 variant="bold" color="white">
                  {letterPdfMessage}
                </H3>
              </div>
            ) : (
              <LetterForm
                className="w-[100%] p-0 py-10 px-5 md:py-0"
                formTitle={pageoverview?.download_brief_title}
                formSubtitle={pageoverview?.download_brief_subtitle}
                onIsSubmit={onSubmit}
              />
            )}
          </Container>
        </LetterFormWrapper>
        <section className="my-[80px]">
          <Container className="max-w-[1385px]">
            <div className="mt-[80px]">
              <H3
                variant="bold"
                style={{ margin: 0 }}
                className="text-[36px] font-[400] md:text-[42px]"
              >
                gerelateerde brieven
              </H3>
            </div>
          </Container>
          <Container className="max-w-[1385px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-[20px] md:my-[32px]">
              {relatedLetters.map((letter: Letter) => (
                <BriefItem
                  key={letter.id}
                  title={letter.title}
                  titleHighlighted={letter.title_highlighted}
                  content={letter.description}
                  imgSrc={parseImageURL(letter.image?.id)}
                  fileSrc={`/open-brieven/${letter.slug}`}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </PageWrapper>
  );
}

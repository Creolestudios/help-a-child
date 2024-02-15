import { Container, Grid } from "@mui/material";
import {
  ForumRulesWrapper,
  HeroButtonWrapper,
} from "../styles/kinderen/index.styles";
import { H2, H3, P, TitleWithHighlights } from "../components/typography";
import React, { useState } from "react";
import { getForumOverviewPageData, postForum } from "../utils/api";

import Button from "../components/buttons/Button";
import Dropdown from "../components/form/Dropdown/Dropdown";
import { ForumPageProps } from "../types/pageTypes";
import { Hero } from "../components/layout";
import { HeroBannerWrapper } from "../styles/global.styled";
import Image from "next/image";
import Input from "../components/form/Input/Input";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import { StyledForm } from "../styles/CommonFormWrapper.styles";
import { THEMA } from "../constants/thema";
import TextArea from "../components/form/TextArea/TextArea";
import parseImageURL from "../utils/parseImageURL";
import { useForm } from "react-hook-form";

export const getServerSideProps = async () => {
  try {
    const pageReq = await getForumOverviewPageData();
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

export default function Vraag({ pageData }: ForumPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const submitForm = async (data: any) => {
    setIsLoading(true);
    try {
      await postForum(data);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    }

    setIsLoading(false);
  };

  return (
    <PageWrapper
      seo={{
        title: pageData?.seo_title ? pageData?.seo_title : pageData?.page_title,
        description: pageData?.seo_description
          ? pageData?.seo_description
          : pageData?.page_subtitle,
        canonical: "http://localhost:3000/forum",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : "",
      }}
    >
      <Hero
        center
        imageUrl={parseImageURL(pageData?.message_hero_image?.id, 1400)}
        style={{
          minHeight: 656,
          position: "relative",
        }}
        mobileImageHeight={564}
      >
        <HeroBannerWrapper className="stel-een-vraag">
          <div className="title-wrap max-w-4xl">
            <TitleWithHighlights
              text={pageData?.message_hero_title ?? ""}
              color="white"
              className="title mb-[10px]"
            />
            <P color="white" variant="light" className="subtitle mb-[24px]">
              {pageData?.message_hero_subtitle}
            </P>
            <HeroButtonWrapper className="flex md:justify-center">
              <Button
                variant="infoReversed"
                filled={false}
                href={"/forum"}
                className="w-fit px-[40px] text-[18px] font-[400] bg-[transparent] py-[40px] md:py-[0] border-[#fff] text-[#fff] hover:bg-[#ff971d] hover:border-none md:w-auto"
              >
                {pageData?.message_hero_button_title}
              </Button>
            </HeroButtonWrapper>
          </div>
        </HeroBannerWrapper>
      </Hero>
      <main style={{ marginBottom: "80px" }}>
        <Container className="mb-[80px] mt-[-105px] md:mt-[-135px] relative md:mb-[120px] max-w-[1385px]">
          <div className="relative h-[100%]">
            <StyledForm>
              {!isSubmitted ? (
                <form
                  className="flex h-[100%]"
                  onSubmit={handleSubmit(submitForm)}
                >
                  <Grid container spacing="33px" className="form-wrapper">
                    <Grid item xs={12} lg={12}>
                      <H3 className="text-[#fff]">
                        {pageData?.form_title}
                        <Image
                          src={"/note.svg"}
                          width={40}
                          height={40}
                          alt={"Heading icon"}
                          objectFit="contain"
                          className="pl-1 inline float-right absolute"
                        />
                      </H3>
                      <P className="text-[#fff]">{pageData?.form_subtitle}</P>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Input
                        label="Voornaam"
                        required
                        name="user_name"
                        placeholder="Jouw voornaam..."
                        register={register}
                        hasError={!!errors.user_name}
                        helperText={errors.user_name && "Vul je voornaam in"}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Dropdown
                        options={THEMA}
                        required
                        label="Thema"
                        name="thema"
                        register={register}
                        placeholder="Het thema..."
                        helperText={
                          !!errors?.thema
                            ? "selecteer alstublieft een optie"
                            : ""
                        }
                        hasError={!!errors?.thema}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Input
                        label="E-mail"
                        required
                        name="user_email"
                        placeholder="Jouw email..."
                        register={register}
                        hasError={!!errors.user_email}
                        helperText={errors.user_email && "Vul je email in"}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Input
                        label="Woonplaats"
                        required
                        name="residence"
                        placeholder="Jouw woonplaats..."
                        register={register}
                        hasError={!!errors.residence}
                        helperText={errors.residence && "Vul je woonplaats in"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        label="Bericht titel"
                        type="text"
                        required
                        name="title"
                        placeholder="De titel van jouw bericht..."
                        register={register}
                        hasError={!!errors.title}
                        helperText={errors.title && "Vul je bericht titel in"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        label="Bericht"
                        name="content"
                        placeholder="Jouw bericht..."
                        required
                        rows={5}
                        register={register}
                        hasError={!!errors.content}
                        helperText={
                          !!errors.content ? "Dit veld is verplicht" : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Grid item xs={12}>
                        <Button
                          loading={isLoading}
                          className="forum_act w-[100] bg-[#fff] text-[#FF971D] text-[18px] font-[400]"
                        >
                          {isLoading
                            ? "Bezig..."
                            : isSubmitted
                            ? "Verzonden"
                            : "Ja, ik wil mijn bericht plaatsen"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16 mx-auto">
                  <H2 variant="bold" className="text-[#fff]">
                    Bedankt voor je aanmelding!
                  </H2>
                  <P className="text-[#fff]">
                    We nemen zo snel mogelijk contact met je op.
                  </P>
                </div>
              )}
            </StyledForm>
          </div>
        </Container>
        <ForumRulesWrapper>
          <Container className="max-w-[1385px]">
            <H3 style={{ fontFamily: "Fjalla One" }}>
              {pageData?.forum_rules_title}
            </H3>
            <div
              style={{ fontFamily: "Avenir" }}
              dangerouslySetInnerHTML={{
                __html: pageData?.forum_rules_content,
              }}
              className="forum_rules"
            />
          </Container>
        </ForumRulesWrapper>
      </main>
    </PageWrapper>
  );
}

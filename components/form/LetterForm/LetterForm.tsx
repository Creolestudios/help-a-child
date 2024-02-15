import { H2, P } from "../../typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../buttons/Button";
import { Grid } from "@mui/material";
import Image from "next/image";
import Input from "../Input/Input";
import { LetterDownloadType } from "../../../types/forumTypes";
import Section from "../../layout/Section/Section";
import styled from "styled-components";

const LetterForm = ({
  className,
  isSubmitted,
  onIsSubmit,
  formSubtitle,
  formTitle,
  paddingSize = "md",
}: {
  isSubmitted?: boolean;
  formSubtitle?: string;
  formTitle?: string;
  className?: string;
  paddingSize?: "sm" | "md";
  onIsSubmit: (x: any) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LetterDownloadType>();

  const submitForm = async (data: any) => {
    onIsSubmit(data);
    reset({ user_name: "", user_email: "", residence: "" });
  };

  const onSubmit: SubmitHandler<LetterDownloadType> = async (data) => {
    const checkboxtipsins: HTMLInputElement | null = document.getElementById(
      "input-check"
    ) as HTMLInputElement;
    data.tips_inspiration_email = checkboxtipsins?.checked;
    submitForm(data);
  };

  const StyledForm = styled.div`
    &:before {
      content: " ";
      display: block;
      position: absolute;
      left: 0;
      top: 0px;
      width: 100%;
      height: 100%;
      opacity: 0.25;
      background: url("/chatBg.png");
      // background-size: cover;
      // background-repeat: no-repeat;
      /* background-position: center center; */
      background-size: 59%;
      background-position: left 225px top -75px;
      z-index: 1;
    }
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: rgba(255, 151, 29, 1);
    border-radius: 8px;
    padding: 32px;

    label {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 800;
      font-size: 18px;
      line-height: 160%;
      color: white;
    }

    form {
      position: relative;
      z-index: 2;
      div,
      .selectBox {
        border: none;
      }
    }
    @media (max-width: 768px) {
      padding: 24px !important;
      &:before {
        background-size: 135%;
        background-position: left -108px top 8px;
      }
      form > div > div {
        padding: 14px 0 !important;
      }
      .form-wrapper {
        margin: auto !important;
        width: inherit;
      }
      label {
        margin-bottom: 6px;
        line-height: 130%;
      }
    }
  `;
  return (
    <Section
      backgroundColor="white"
      paddingSize={paddingSize}
      className={className}
    >
      <div className="relative h-[100%]">
        <StyledForm>
          <div className="item-center mt-3 mb-5">
            <H2 style={{ color: "#fff", margin: "0px", fontSize: "32px" }}>
              {formTitle}
              <Image
                src={"/note.svg"}
                width={40}
                height={40}
                alt={"Heading icon"}
                objectFit="contain"
                className="pl-1 inline float-right absolute"
              />
            </H2>
            <P color="white">{formSubtitle}</P>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex h-[100%]">
            <Grid container spacing={"33"} className="form-wrapper">
              <Grid item xs={12} md={6}>
                <Input
                  label="Voornaam"
                  name="user_name"
                  required
                  placeholder="Jouw voornaam..."
                  register={register}
                  hasError={!!errors.user_name}
                  helperText={!!errors.user_name ? "voornaam is verplicht" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  label="E-mailadres"
                  required
                  type="email"
                  name="user_email"
                  placeholder="Jouw email..."
                  register={register}
                  hasError={!!errors?.user_email}
                  helperText={
                    !!errors?.user_email ? "e-mailadres is verplicht" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  label="Woonplaats"
                  name="residence"
                  placeholder="Jouw woonplaats..."
                  register={register}
                  hasError={!!errors.residence}
                  helperText={
                    !!errors.residence ? "woonplaats is verplicht" : ""
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="info"
                  loading={isLoading}
                  disabled={isSubmitted}
                  className="bg-[#fff] w-[100%] text-center text-[#ff971d] text-[18px] font-[400]"
                >
                  download brief
                </Button>
              </Grid>
            </Grid>
          </form>
        </StyledForm>
      </div>
    </Section>
  );
};

export default LetterForm;

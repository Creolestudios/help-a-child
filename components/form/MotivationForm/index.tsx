import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../buttons/Button";
import { Grid } from "@mui/material";
import { MotivationType } from "../../../types/forumTypes";
import TextArea from "../TextArea/TextArea";
import styled from "styled-components";

const MotivationForm = ({
  className,
  step,
  setStep,
  paddingSize = "md",
  setVolunteerMotivation,
}: {
  setVolunteerMotivation: (params: MotivationType) => void;
  isSubmitted?: boolean;
  className?: string;
  paddingSize?: "sm" | "md";
  step: number;
  setStep: (params: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MotivationType>();

  const submitForm = async (data: MotivationType) => {
    setVolunteerMotivation(data);
  };

  const onSubmit: SubmitHandler<MotivationType> = async (data) => {
    submitForm(data);
    setStep(step + 1);
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
      // background-size: cover;
      // background-repeat: no-repeat;
      /* background-position: center center; */
      background-size: 59%;
      background-position: left 225px top -75px;
      z-index: 1;
    }
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 8px;
    label {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
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
      label {
        color: #000;
        font-size: 18px;
        font-weight: 800;
      }
    }
    @media (max-width: 768px) {
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
        margin-bottom: 14px;
        line-height: 130%;
      }
    }
  `;
  return (
    <div className="relative h-[100%]">
      <StyledForm>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-[100%]">
          <Grid container spacing={"16"} className="form-wrapper">
            <Grid item xs={12}>
              <TextArea
                label="Waarom wil je vrijwilliger worden bij help a child? Waarom spreekt het jou aan en past het bij jou?"
                name="volunteer_at_organization"
                placeholder="Jouw antwoord..."
                required
                register={register}
                hasError={!!errors.volunteer_at_helpachild}
                helperText={
                  !!errors.volunteer_at_helpachild
                    ? "Dit veld is verplicht"
                    : ""
                }
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Hoe heb je de scheiding van je ouders beleefd? Wat zijn jouw ervaringen?"
                name="your_experiences"
                placeholder="Jouw antwoord..."
                required
                register={register}
                hasError={!!errors.your_experiences}
                helperText={
                  !!errors.your_experiences ? "Dit veld is verplicht" : ""
                }
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Waarom is het juist nu de tijd voor jou om je in te zetten als vrijwilliger voor kinderen met gescheiden ouders?"
                name="volunteer_for_children"
                placeholder="Jouw antwoord..."
                required
                register={register}
                hasError={!!errors.volunteer_for_children}
                helperText={
                  !!errors.volunteer_for_children ? "Dit veld is verplicht" : ""
                }
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="infoReversed"
                loading={isLoading}
                //   disabled={isSubmitted}
                className="bg-[#FE517E] w-[100%] text-center text-[#fff] border-none text-[18px] font-[400]"
              >
                volgende
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledForm>
    </div>
  );
};

export default MotivationForm;

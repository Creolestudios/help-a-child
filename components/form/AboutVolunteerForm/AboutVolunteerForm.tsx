import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form"; // Import the necessary modules
import ControlledInput from "../Input/ControlledInput"; // Replace with the actual path to your ControlledInput component
import { AboutVolunteerType } from "../../../types/forumTypes";
import styled from "styled-components";
import Button from "../../buttons/Button";
import Dropdown from "../Dropdown/Dropdown";
import { GENDERS } from "../../../constants/genders";
import { KNOWABOUTUSFROM } from "../../../constants/know-aboutus-from";
import ControlledDropDown from "../Dropdown/ControlledDropDown";
// import Dropdown from "./Dropdown"; // Replace with the actual path to your Dropdown component

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
    background-size: 59%;
    background-position: left 225px top -75px;
    z-index: 1;
  }
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 8px;
  padding: 32px 0;

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
      color: #000 !important;
      font-size: 18px;
      font-weight: 800;
      line-height: 160%;
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
const AboutVolunteerForm = ({
  className,
  step,
  setStep,
  setAboutVolunteer,
  paddingSize = "md",
}: {
  setAboutVolunteer: (params: AboutVolunteerType) => void;
  className?: string;
  paddingSize?: "sm" | "md";
  step: number;
  setStep: (params: number) => void;
}) => {
  const [knowFrom, setKnowFrom] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm<AboutVolunteerType>(); // Initialize react-hook-form

  const submitForm = async (data: AboutVolunteerType) => {
    setAboutVolunteer({ ...data });
  };

  const onSubmit: SubmitHandler<AboutVolunteerType> = async (data) => {
    submitForm(data);
    setStep(step + 1);
  };

  return (
    <div className="relative h-[100%]">
      <StyledForm>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-[100%]">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Controller
                name="your_initials"
                control={control}
                defaultValue=""
                rules={{ required: "Initialen is verplicht" }}
                render={({ field }) => (
                  <ControlledInput
                    label="Wat zijn je initialen?"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Jouw initialen"
                    hasError={!!errors.your_initials}
                    helperText={
                      errors.your_initials ? errors.your_initials.message : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                rules={{ required: "voornaam is verplicht" }}
                render={({ field }) => (
                  <ControlledInput
                    label="Wat is je voornaam?"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Jouw voornaam..."
                    hasError={!!errors.first_name}
                    helperText={
                      errors.first_name ? "voornaam is verplicht" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="surname"
                control={control}
                defaultValue=""
                rules={{ required: "achternaam is verplicht" }}
                render={({ field }) => (
                  <ControlledInput
                    label="Wat is je achternaam?"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Jouw achternaam..."
                    hasError={!!errors.surname}
                    helperText={errors.surname ? "achternaam is verplicht" : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: "Initialen is verplicht" }}
                render={({ field }) => (
                  <ControlledDropDown
                    {...field}
                    field={field}
                    clearErrors={clearErrors}
                    watch={watch}
                    setValue={setValue}
                    options={GENDERS}
                    fill={"#FE517E"}
                    required
                    label="Wat is je geslacht?"
                    placeholder="Jouw geslacht..."
                    name="gender"
                    hasError={!!errors.gender}
                    helperText={
                      !!errors?.gender
                        ? "selecteer alstublieft één geslacht"
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Use Controller for validated fields */}
              <Controller
                name="birth_date"
                control={control}
                defaultValue=""
                rules={{ required: "Initialen is verplicht" }}
                render={({ field }) => (
                  <ControlledInput
                    type="date"
                    label="Wat is je geboortedatum?"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Jouw leeftijd... (18-25)"
                    hasError={!!errors.birth_date}
                    helperText={
                      errors.birth_date ? "geboortedatum is verplicht" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="email_address"
                control={control}
                defaultValue=""
                rules={{ required: "Initialen is verplicht" }}
                render={({ field }) => (
                  <ControlledInput
                    label="Wat is je e-mailadres"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Jouw e-mailadres..."
                    hasError={!!errors.email_address}
                    helperText={
                      errors.email_address ? "e-mailadres is verplicht" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: "Initialen is verplicht" }}
                render={({ field }) => (
                  <ControlledInput
                    label="Waar woon je?"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Jouw woonplaats..."
                    hasError={!!errors.address}
                    helperText={errors.address ? "adres is verplicht" : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="phone_number"
                control={control}
                defaultValue=""
                rules={{ required: "Initialen is verplicht" }}
                render={({ field }) => (
                  <ControlledInput
                    label="Telefoonnummer"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Jouw telefoonnummer..."
                    hasError={!!errors.phone_number}
                    helperText={
                      errors.phone_number ? "telefoonnummer is verplicht" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="know_about_us"
                control={control}
                defaultValue=""
                rules={{ required: "Initialen is verplicht" }}
                render={({ field }) => (
                  <ControlledDropDown
                    {...field}
                    field={field}
                    clearErrors={clearErrors}
                    watch={watch}
                    setValue={setValue}
                    options={KNOWABOUTUSFROM}
                    fill={"#FE517E"}
                    required
                    label="Hoe ken je ons?"
                    placeholder="selecteer..."
                    name="know_about_us"
                    hasError={!!errors.know_about_us}
                    helperText={
                      !!errors?.know_about_us
                        ? "selecteer alstublieft één geslacht"
                        : ""
                    }
                  />
                )}
              />
            </Grid>

            {knowFrom === "Anderen" && (
              <Grid item xs={12} md={4}>
                <Controller
                  name="other_reference_from"
                  control={control}
                  defaultValue=""
                  rules={{ required: "weet van is verplicht" }}
                  render={({ field }) => (
                    <ControlledInput
                      label="weet van?"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="weet van..."
                      hasError={!!errors.other_reference_from}
                      helperText={
                        errors.other_reference_from
                          ? errors.other_reference_from.message
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="infoReversed"
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

export default AboutVolunteerForm;

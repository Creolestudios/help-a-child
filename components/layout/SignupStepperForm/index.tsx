import React, { useState } from "react";
import { H3, P } from "../../typography";
import AboutVolunteerForm from "../../form/AboutVolunteerForm/AboutVolunteerForm";
import MotivationForm from "../../form/MotivationForm";
import TrainingDatesForm from "../../form/TrainingDatesForm/TrainingDatesForm";
import { AboutVolunteerType, MotivationType } from "../../../types/forumTypes";
import { useRouter } from "next/router";

const SignupStepperForm = ({ stepTitle, children }: any) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aboutVolunteer, setAboutVolunteer] = useState<AboutVolunteerType>({
    your_initials: "",
    first_name: "",
    surname: "",
    gender: "",
    birth_date: "",
    email_address: "",
    address: "",
    phone_number: "",
    know_about_us: "",
    other_reference_from: "",
  });

  const [volunteerMotivation, setVolunteerMotivation] =
    useState<MotivationType>({
      volunteer_at_helpachild: "",
      your_experiences: "",
      volunteer_for_children: "",
    });
  const currentActiveForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="flex justify-between">
              <H3>Wie ben jij?</H3>
              <H3>{step + "/" + 3}</H3>
            </div>
            <AboutVolunteerForm
              step={step}
              setStep={setStep}
              setAboutVolunteer={setAboutVolunteer}
            />
          </>
        );
      case 2:
        return (
          <>
            <div>
              <div className="flex justify-between">
                <H3 className="text-[32px]">motivatie</H3>
                <H3>{step + "/" + 3}</H3>
              </div>
              <P>Beantwoordt deze 3 korte vragen in een paar zinnen:</P>
            </div>
            <MotivationForm
              step={step}
              setStep={setStep}
              setVolunteerMotivation={setVolunteerMotivation}
            />
          </>
        );
      case 3:
        return (
          <>
            <div>
              <div className="flex justify-between">
                <H3 className="text-[32px]">Trainingsdata</H3>
                <H3>{step + "/" + 3}</H3>
              </div>
              <P style={{ fontWeight: "800" }}>
                Ik ben aanwezig op deze trainingen (één kiezen):
              </P>
            </div>
            <TrainingDatesForm
              step={step}
              setStep={setStep}
              setIsSubmitted={setIsSubmitted}
              aboutVolunteer={aboutVolunteer}
              volunteerMotivation={volunteerMotivation}
            />
          </>
        );
      default:
        return null;
    }
  };
  const redirect = () => {
    router.push("/bedankt-pagina");
  };
  return (
    <div
      className={
        isSubmitted
          ? "bg-transparent"
          : "bg-[#FFECF1] p-[32px] mt-[-50px] max-w-[912px] mx-auto relative rounded-[5px]"
      }
    >
      {isSubmitted ? <>{redirect()}</> : currentActiveForm()}
    </div>
  );
};

export default SignupStepperForm;

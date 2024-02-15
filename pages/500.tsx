import { H1, P } from "../components/typography";

import BreadCrumbs from "../components/layout/BreadCrumbs/BreadCrumbs";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import React from "react";

const ErrorPage = () => {
  return (
    <PageWrapper
      seo={{
        title: "Oeps! Er is een fout opgetreden.",
        description:
          "Er is iets misgegaan bij het opvragen van de pagina. Probeer het later opnieuw.",
        canonical: "http://localhost:3000/500",
      }}
    >
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <H1 variant="bold">Oeps! Er is een fout opgetreden.</H1>
          <P>
            Er is iets misgegaan bij het opvragen van de pagina. Probeer het
            later opnieuw.
          </P>
        </div>
      </main>
    </PageWrapper>
  );
};

export default ErrorPage;

import { H1, P } from "../components/typography";

import BreadCrumbs from "../components/layout/BreadCrumbs/BreadCrumbs";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import React from "react";

const NotFoundPage = () => {
  return (
    <PageWrapper
      seo={{
        title: "Oeps! Deze pagina bestaat niet.",
        description:
          "Helaas hebben we de opgevraagde pagina niet kunnen vinden.",
        canonical: "http://localhost:3000/404",
      }}
    >
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <H1 variant="bold">Oeps! Deze pagina bestaat niet.</H1>
          <P>Helaas hebben we de opgevraagde pagina niet kunnen vinden.</P>
        </div>
      </main>
    </PageWrapper>
  );
};

export default NotFoundPage;

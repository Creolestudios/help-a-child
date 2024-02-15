import "../styles/globals.css";

import * as fbq from "../lib/fpixel";

import type { AppProps } from "next/app";
import AppProviders from "../providers/AppProviders";
import { DefaultSeo } from "next-seo";
import MaintenanceModal from "../components/modals/MaintenanceModal/Maintenance";
import { Open_Sans } from "@next/font/google";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

const openSans = Open_Sans({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    return <MaintenanceModal />;
  }
  // useEffect(() => {
  //   fbq.pageview();

  //   // const handleRouteChange = () => {
  //   //   fbq.pageview();
  //   // };
  //   // router.events.on("routeChangeComplete", () => handleRouteChange());
  //   // return () => {
  //   //   router.events.off("routeChangeComplete", () => handleRouteChange());
  //   // };
  // }, []);

  return (
    <div className={openSans.className}>
      <AppProviders>
        <DefaultSeo
          title="Help a child"
          description="Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Help a child op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen."
          openGraph={{
            type: "website",
            locale: "nl_NL",
            url: "#",
            siteName: "Help a child",
          }}
          twitter={{
            handle: "@Helpachild",
            site: "@Helpachild",
            cardType: "summary_large_image",
          }}
        />
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
          }}
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B876VXFKLE"
        />
        <Script
          id="ga-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
             window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B876VXFKLE');
          `,
          }}
        />

        <Component {...pageProps} />
      </AppProviders>
    </div>
  );
}

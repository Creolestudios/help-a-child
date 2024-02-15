import { H3, P } from "../../typography";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { CompanyInfo } from "../../../types/componayInfoTypes";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../icons/Logo/Logo";
import { getCompanyInfo } from "../../../utils/api";
import { isInternalLink } from "../../../utils/url";
import parseImageURL from "../../../utils/parseImageURL";

const StyledFooter = styled.footer`
  .footer-top {
    background: #ebfffc;
    padding: 44px 0;

    h3 {
      color: #150f2f;
      font-size: 22px;

      @media all and (min-width: 1200px) {
        font-size: 32px;
        white-space: nowrap;
      }
    }
    p {
      color: #150f2f;
      transition: all 0.3s ease;
      font-size: 14px;

      @media all and (min-width: 1200px) {
        font-size: 18px;
      }

      &:hover {
        font-weight: 600;
        transition: all 0.3s ease;
      }
    }
  }
  .footer-bottom {
    background: ${({ theme }) => theme.colors.white.normal};
    padding: 17px 0;

    a {
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
      text-decoration-line: underline;
      color: ${({ theme }) => theme.colors.text.normal};
    }
  }

  .logos_heading {
    color: rgba(21, 15, 47, 1);
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    width: 100%;
    display: block;
  }

  .footer_logos_wrapper {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
    align-items: center;
  }
  .social_icons_wrapper p {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .footer_bottom {
    background: rgba(63, 199, 180, 1);
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;

    .link_wrapper {
      display: flex;
      gap: 20px;

      @media all and (min-width: 768px) {
        gap: 50px;
      }
      a {
        color: #fff;
        font-size: 14px;
        font-weight: 300;

        @media all and (min-width: 768px) {
          font-size: 18px;
        }
      }
    }
  }

  .cols_wrapper {
    display: flex;
    width: 100%;
    gap: 50px;
    flex-wrap: wrap;

    @media all and (min-width: 768px) {
      flex-wrap: nowrap;
    }

    @media all and (min-width: 1450px) {
      gap: 150px;
    }

    .__custom_col {
      display: flex;
    }

    .__col_4 {
      width: 100%;

      @media all and (min-width: 768px) {
        width: 30%;
      }
    }
    .__col_8 {
      width: 100%;
      justify-content: space-around;
      gap: 50px;
      flex-direction: column;

      @media all and (min-width: 768px) {
        width: 70%;
        flex-direction: row;
      }
    }
  }
  .logos_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footer_logo {
      /* width: 200px; */
      margin-bottom: 50px;

      @media all and (min-width: 1200px) {
        width: 294px !important;
      }
    }
  }
`;

const AppLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  if (isInternalLink(href)) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default function Footer() {
  const [isLoading, setIsLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  const generateLogo = () => {
    if (companyInfo?.company_logo_white.id) {
      const logoUrl = parseImageURL(companyInfo?.company_logo_white.id);
      return (
        <Image
          src={logoUrl}
          alt={companyInfo.company_name}
          width={177}
          height={88}
          className="object-cover"
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getCompanyInfo();
      if (data) {
        setCompanyInfo(data);
      }
      setIsLoading(false);
    };

    if (!companyInfo && isLoading) {
      getData();
    }
  }, [companyInfo, isLoading]);

  return (
    <StyledFooter>
      <div className="footer-top">
        <Container maxWidth="xl">
          <Grid container>
            <div className="cols_wrapper">
              <div className="__custom_col __col_4">
                <div className="logos_wrapper">
                  <Image src="/logo.svg" alt="" width={100} height={50} />

                  <div>
                    <span className="logos_heading">We komen voor in:</span>
                    <div className="footer_logos_wrapper">
                      <Image
                        src="/footer_logo_1.png"
                        alt=""
                        width={37}
                        height={41}
                      />
                      <Image
                        src="/footer_logo_2.png"
                        alt=""
                        width={53}
                        height={42}
                      />
                      <Image
                        src="/footer_logo_3.png"
                        alt=""
                        width={66}
                        height={40}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="__custom_col __col_8">
                <Grid item xs={12} md={3}>
                  <H3 className="mb-5">Contact</H3>
                  <P>Help a child</P>
                  <P>{companyInfo?.company_address}</P>
                  <P>
                    {companyInfo?.company_zipcode} {companyInfo?.company_city}
                  </P>
                  <P>helpachild@yopmail.com</P>
                  <P>{companyInfo?.company_kvk}</P>
                  <P>{companyInfo?.company_RSIN}</P>
                </Grid>

                <Grid item xs={12} md={3}>
                  <H3 className="mb-5">Socials</H3>
                  <div className="social_icons_wrapper">
                    {!!companyInfo?.instagram_url && (
                      <P>
                        <Image src="/in.png" alt="" width={16} height={17} />
                        <AppLink href={companyInfo.instagram_url}>
                          Instagram
                        </AppLink>
                      </P>
                    )}
                    {!!companyInfo?.twitter_url && (
                      <P>
                        <Image src="/tw.png" alt="" width={18} height={16} />
                        <AppLink href={companyInfo.twitter_url}>
                          Twitter
                        </AppLink>
                      </P>
                    )}
                    {!!companyInfo?.linkedin_url && (
                      <P>
                        <Image src="/ln.png" alt="" width={16} height={17} />
                        <AppLink href={companyInfo.linkedin_url}>
                          Linkedin
                        </AppLink>
                      </P>
                    )}
                    {!!companyInfo?.facebook_url && (
                      <P>
                        <Image src="/fb.png" alt="" width={10} height={18} />
                        <AppLink href={companyInfo.facebook_url}>
                          Facebook
                        </AppLink>
                      </P>
                    )}
                    {!!companyInfo?.tiktok_url && (
                      <P>
                        <Image src="/tk.png" alt="" width={16} height={19} />
                        <AppLink href={companyInfo.tiktok_url}>Tiktok</AppLink>
                      </P>
                    )}
                  </div>
                </Grid>
              </div>
            </div>
          </Grid>
        </Container>
      </div>
      <div className="footer_bottom">
        <div className="link_wrapper">
          <a href="">Privacyverklaring</a>
          <a href="">Algemene voorwaarden</a>
          <a href="">Cookies</a>
        </div>
      </div>
    </StyledFooter>
  );
}

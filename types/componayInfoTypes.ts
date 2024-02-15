import { PublicationType } from "./content-types/Publication.type";
import { ImageFileType } from "./fileTypes";

export type CompanyInfo = {
  id: string;
  company_logo_black: ImageFileType;
  company_logo_white: ImageFileType;
  company_name: string;
  company_address: string;
  company_zipcode: string;
  company_city: string;
  company_email: string;
  company_kvk: string;
  company_RSIN: string;
  instagram_url: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  tiktok_url: string;
  privacy_url: string;
  terms_condition_url: string;
  cookies_url: string;
  important_links: {
    id: number;
    name: string;
    link: string;
  }[];
  important_links_title: string;
  external_publications: {
    external_publications_id: PublicationType;
  }[];
};

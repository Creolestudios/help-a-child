import { BlogType } from "./content-types/Blog.type";
import { CategoryType } from "./categoryTypes";
import { FAQ } from "./content-types/FAQ.type";
import { FeedItem } from "../components/layout/MasonryGrid/MasonryGrid";
import { ForumPostType } from "./forumTypes";
import { ImageFileType } from "./fileTypes";
import { Tag } from "./content-types/Tag.type";
import { TipPostType } from "./tipTypes";

export type HomePageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    seo_title: string;
    seo_description: string;
    seo_image: ImageFileType;
    thumb_icon: ImageFileType;
    mobile_hero_image: ImageFileType;
    hero_image: ImageFileType;
    tag_select_subject_title: string;
    tag_subject_title: string;
    loader_post_message: string;
    loader_more_post_message: string;
    highlight_words: { word: string; color: string }[];
  };
  categories: CategoryType[];
  totalPosts: number;
  feed: FeedItem[];
  pagetopRes: any;
};

export type BlogPageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    search_bar_quote: string;
    seo_title: string;
    seo_description: string;
    seo_image: ImageFileType;
    hero_image: ImageFileType;
  };
  blogsData: BlogType[];
  totalPosts: number;
  tags: Tag[];
};

export type BlogDetailPageProps = {
  pageData?: BlogType;
};

export type TipDetailPageProps = {
  pageData?: TipPostType;
};

export type ForumPageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    submit_question_button_label: string;
    chat_button_label: string;
    seo_title: string;
    seo_description: string;
    hero_image: ImageFileType;
    seo_image: ImageFileType;
    search_bar_quote: string;
    forum_rules_title: string;
    forum_rules_content: any;
    message_hero_image: ImageFileType;
    message_hero_title: string;
    message_hero_subtitle: string;
    message_hero_button_url: string;
    message_hero_button_title: string;
    form_title: string;
    form_subtitle: string;
    reactie01_hero_title: string;
    reactie01_hero_subtitle: string;
  };
  forumData: ForumPostType[];
  totalPosts: number;
  tags: Tag[];
};

export type ForumDetailPageProps = {
  pageData?: ForumPostType;
};

export type VolunteersFAQPageProps = {
  pageData: {
    page_title: string;
    page_subtitle?: string;
    seo_title: string;
    another_question_title?: string;
    another_question_description?: string;
    seo_description: string;
    seo_image: ImageFileType;
    background_image: any;
  };
  faqData: FAQ[];
  totalFaqs: number;
  error?: boolean;
};

export type TheBookPageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    page_title_highlighted: [{ value: string }];
    seo_title: string;
    seo_description: string;
    seo_image: ImageFileType;
    media_section_1_title: string;
    media_section_1_title_highlighted: [{ value: string }];
    media_section_1_description: string;
    media_section_1_image: ImageFileType;
    media_section_1_button_label: string;
    media_section_1_button_url: string;
  };
};

export type ForumQuestionPageProps = {
  categories: CategoryType[];
};

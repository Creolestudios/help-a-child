import { CategoryType } from "../categoryTypes";
import { ImageFileType, VideoFileType } from "../fileTypes";
import { ForumCommentType } from "../forumTypes";
import { UserType } from "../userTypes";
import { ContentStatus } from "./Status.type";

export type BlogType = {
  author: string;
  categories: { categories_id?: CategoryType }[];
  content?: string;
  quote_content: string;
  after_quote_content: string;
  date_created: string;
  date_updated: string;
  external_links?: any;
  homepage_id?: string;
  id: string;
  slug: string;
  image: ImageFileType;
  status: ContentStatus;
  title: string;
  type: "blog" | "vlog";
  user_created: UserType;
  user_updated: UserType;
  video?: VideoFileType;
  youtube_embed: string;
  comments: ForumCommentType[];
  related: {
    related_vlogposts_id: BlogType;
  }[];
};

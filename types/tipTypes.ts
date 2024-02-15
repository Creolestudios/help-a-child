import { CategoryType } from "./categoryTypes";
import { ContentStatus } from "./content-types/Status.type";

export type TipPostType = {
  id: string;
  slug: string;
  status: ContentStatus;
  date_created: string;
  date_updated: string;
  name: string;
  introduction: string;
  content: string;
  categories?: { categories_id: CategoryType }[];
  author?: string;
  image?: {
    filename_download: string;
    id?: string;
    type?: string;
  };
};

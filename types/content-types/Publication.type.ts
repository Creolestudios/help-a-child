import { ContentStatus } from "./Status.type";

export type PublicationType = {
  id: number | string;
  status: ContentStatus;
  sort?: number;
  user_created?: string;
  date_created?: string;
  date_updated?: string;
  link?: string;
  logo_black?: string;
  logo_white?: string;
  name?: string;
  user_updated?: any;
};

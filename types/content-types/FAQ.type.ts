import { ContentStatus } from "./Status.type";

export type FAQ = {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
  user_created: unknown;
  user_updated: unknown;
  date_created: string;
  date_updated: string;
};

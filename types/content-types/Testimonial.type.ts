import { ContentStatus } from "./Status.type";

export type Testimonial = {
  id: string;
  title: string;
  author: string;
  description: string;
  date: string;
  date_updated: string;
  status: ContentStatus;
  user_updated: unknown;
};

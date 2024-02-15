import { ContentStatus } from "./Status.type";

export type VolunteerStory = {
  id: string;
  date_created: string;
  date_updated: string;
  slug: string;
  status: ContentStatus;
  title: string;
  description: string;
  content: string;
  image: any;
  video: any;
  volunteer_name: string;
};

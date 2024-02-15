import { ContentStatus } from "./content-types/Status.type";

export type CategoryType = {
  id: string;
  name: string;
  open_letters?: string[] | number[];
  status: ContentStatus;
  vlogposts: number[] | string[];
};

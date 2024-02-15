import { BlogType } from "./Blog.type";
import { ContentStatus } from "./Status.type";
import { Letter } from "./Letter.type";

export type Tag = {
  id: string;
  name: string;
  status: ContentStatus;
  open_letters?: Letter[];
  vlogposts?: BlogType[];
};

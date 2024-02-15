import { ImageFileType, VideoFileType } from "../fileTypes";

export type VideoType = {
  id: string;
  title: string;
  subtitle: string;
  video_cover_image: ImageFileType;
  video_file?: {
    id: string;
    url: string;
  };
};

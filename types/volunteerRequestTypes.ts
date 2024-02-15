import { AboutVolunteerType, MotivationType, TrainingType } from "./forumTypes";
export type VolunteerRequestType =
  | {
      id?: string;
      date_created?: string;
      date_updated?: string;
      webform_id: string;
      entity_type: null;
      entity_id: null;
      in_draft: boolean;
      langcode: string;
      uri: string;
      email: string;
    }
  | AboutVolunteerType
  | MotivationType
  | TrainingType;

import { LocationType } from './LocationType';

export interface QuestResponseType {
  location: LocationType;
  timestamp: string;
  next: QuestResponseType;
}

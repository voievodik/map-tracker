import { LocationType } from '../types/LocationType';

export class Quest {
  location: LocationType;

  timestamp: string;

  next: Quest | null;

  constructor(location: LocationType, timestamp: string) {
    this.location = location;
    this.timestamp = timestamp;
    this.next = null;
  }
}

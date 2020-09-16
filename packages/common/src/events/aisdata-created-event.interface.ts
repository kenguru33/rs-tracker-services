import { Patterns } from './patterns.enum';

export interface AisdataCreatedEvent {
  pattern: Patterns.AisdataCreated;
  data: {
    id: string;
    mmsi: string;
    lat: number;
    lng: number;
    sog: number;
    cog: number;
    timeStamp: string;
  };
}

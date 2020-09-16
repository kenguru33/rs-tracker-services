import { Patterns } from "./patterns.enum";

export interface AisdataCollectedEvent {
  pattern: Patterns.AisdataCollected
  data: {
    mmsi: string;
    lat: number;
    lng: number;
    sog: number;
    cog: number;
    timeStamp: string;
  };
}

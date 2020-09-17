import { Patterns } from './patterns.enum';

export interface AisdataCollectedEvent {
  mmsi: string;
  lat: number;
  lng: number;
  sog: number;
  cog: number;
  timeStamp: string;
}

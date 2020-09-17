import {
  AisdataCollectedEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';

export class AisdataCollectedEventDto implements AisdataCollectedEvent {
  mmsi: string;
  lat: number;
  lng: number;
  sog: number;
  cog: number;
  timeStamp: string;
}

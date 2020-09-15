import {
  AisdataCreatedEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';

export class AisdataCreatedEventDto implements AisdataCreatedEvent {
  public pattern: Patterns.AisdataCreated;
  public data: {
    id: string;
    mmsi: string;
    lat: number;
    lng: number;
    sog: number;
    cog: number;
    timeStamp: string;
  };
}

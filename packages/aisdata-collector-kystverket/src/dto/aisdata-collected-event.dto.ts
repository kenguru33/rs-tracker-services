import {
  AisdataCollectedEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';

export class AisdataCollectedEventDto implements AisdataCollectedEvent {
  pattern: Patterns.AisdataCollected = Patterns.AisdataCollected;
  data: {
    mmsi: string;
    lat: number;
    lng: number;
    sog: number;
    cog: number;
    timeStamp: string;
  };
  constructor(data: AisdataCollectedEvent['data'] = null) {
    this.data = data;
  }
}

import { Patterns } from './patterns.enum';

export class AisdataCreatedEvent {
  pattern: Patterns.AisdataCreated = Patterns.AisdataCreated;
  constructor(public data: {
    id: string;
    mmsi: string;
    lat: number;
    lng: number;
    sog: number;
    cog: number;
    timeStamp: string;
  }) {}
}

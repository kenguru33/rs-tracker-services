import { AisdataCreatedEvent, Patterns } from "@redningsselskapet/rs-tracker-services-common";
import { AisdataCreatedEventPublisherService } from "src/publishers/aisdata-created-event-publisher.service";

export class AisdataCreatedEventDto implements AisdataCreatedEvent {
  pattern: Patterns.AisdataCreated;
  data: { id: string; mmsi: string; lat: number; lng: number; sog: number; cog: number; timeStamp: string; };
  constructor (data: AisdataCreatedEvent['data'] = null) {
    this.data = data
  }
}
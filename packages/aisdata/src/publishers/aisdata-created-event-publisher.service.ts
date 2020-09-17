import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable } from '@nestjs/common';
import {
  AisdataCreatedEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';
import { Observable } from 'rxjs';
import { AisdataCreatedEventDto } from 'src/dto/aisdata-created-event.dto';
import { Aisdata } from 'src/schemas/aisdata.schema';

@Injectable()
export class AisdataCreatedEventPublisherService {
  private readonly pattern: Patterns.AisdataCreated = Patterns.AisdataCreated;

  constructor(private publisher: Publisher) {}

  publish(data: AisdataCreatedEvent): Observable<string> {
    return this.publisher.emit<string, AisdataCreatedEvent>(this.pattern, data);
  }
}

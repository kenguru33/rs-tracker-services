import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable, Logger } from '@nestjs/common';
import {
  AisdataCreatedEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';
import { Observable, Subscription } from 'rxjs';
import { AisdataCreatedEventDto } from 'src/dto/aisdata-created-event.dto';
import { Aisdata } from 'src/schemas/aisdata.schema';

@Injectable()
export class AisdataCreatedEventPublisherService {
  private readonly pattern: Patterns.AisdataCreated = Patterns.AisdataCreated;

  constructor(private publisher: Publisher, private logger: Logger) {}

  publish(data: AisdataCreatedEvent): Subscription {
    return this.publisher
      .emit<string, AisdataCreatedEvent>(this.pattern, data)
      .subscribe(guid => this.logger.log(`Published ${this.pattern} event with guid: ${guid}`, 'aisdata'));
  }
}

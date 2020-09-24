import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable, Logger } from '@nestjs/common';
import {
  AisdataMovingEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';
import { Subscription } from 'rxjs';

@Injectable()
export class MovingVesselPublisherService {
  private readonly pattern: Patterns = Patterns.AisdataMoving;

  constructor(private publisher: Publisher, private logger: Logger) {}

  publish(data: AisdataMovingEvent): Subscription {
    return this.publisher
      .emit<string, AisdataMovingEvent>(this.pattern, data)
      .subscribe(guid =>
        this.logger.log(`Published ${this.pattern} event with guid: ${guid}`),
      );
  }
}

import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable, Logger } from '@nestjs/common';
import {
  AisdataCollectedEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AisdataCollectedPublisherService {
  private readonly pattern: Patterns.AisdataCollected =
    Patterns.AisdataCollected;

  constructor(private publisher: Publisher, private logger: Logger) {}

  publish(data: AisdataCollectedEvent): Subscription {
    return this.publisher.emit<string, AisdataCollectedEvent>(
      this.pattern,
      data,
    ).subscribe(guid => this.logger.log(`Published ${this.pattern} event with guid: ${guid}`, 'aisdata-collector-kystverket'))
  }
}

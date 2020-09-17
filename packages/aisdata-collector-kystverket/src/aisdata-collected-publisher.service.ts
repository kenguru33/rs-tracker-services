import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable } from '@nestjs/common';
import {
  AisdataCollectedEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';
import { Observable } from 'rxjs';

@Injectable()
export class AisdataCollectedPublisherService {
  private readonly pattern: Patterns.AisdataCollected =
    Patterns.AisdataCollected;

  constructor(private publisher: Publisher) {}

  publish(data: AisdataCollectedEvent): Observable<string> {
    return this.publisher.emit<string, AisdataCollectedEvent>(
      this.pattern,
      data,
    );
  }
}

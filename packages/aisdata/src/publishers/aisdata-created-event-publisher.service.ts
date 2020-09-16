import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable } from '@nestjs/common';
import { AisdataCreatedEvent } from '@redningsselskapet/rs-tracker-services-common';
import { Observable } from 'rxjs';

@Injectable()
export class AisdataCreatedEventPublisherService {
  constructor(private publisher: Publisher){}
  
  publish(event: AisdataCreatedEvent): Observable<string> {
    return this.publisher.emit<string, AisdataCreatedEvent['data']>(event.pattern, event.data)
  }
}

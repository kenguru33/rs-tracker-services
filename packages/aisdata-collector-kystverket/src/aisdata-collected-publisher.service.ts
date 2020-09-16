import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable } from '@nestjs/common';
import { AisdataCollectedEvent } from '@redningsselskapet/rs-tracker-services-common';
import { Observable } from 'rxjs';
import { AisdataCollectedEventDto } from './dto/aisdata-collected-event.dto';

@Injectable()
export class AisdataCollectedPublisherService {
  constructor(private publisher: Publisher) {}

  publish(data: AisdataCollectedEvent['data']): Observable<string> {
    console.log(data);
    const aisdataCollectedEventDto = new AisdataCollectedEventDto(data);
    console.log(aisdataCollectedEventDto);
    return this.publisher.emit<string, AisdataCollectedEvent['data']>(
      aisdataCollectedEventDto.pattern,
      aisdataCollectedEventDto.data,
    );
  }
}

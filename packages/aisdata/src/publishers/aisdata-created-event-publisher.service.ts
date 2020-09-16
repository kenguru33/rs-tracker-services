import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable } from '@nestjs/common';
import { AisdataCreatedEvent } from '@redningsselskapet/rs-tracker-services-common';
import { Observable } from 'rxjs';
import { AisdataCreatedEventDto } from 'src/dto/aisdata-created-event.dto';
import { Aisdata } from 'src/schemas/aisdata.schema';

@Injectable()
export class AisdataCreatedEventPublisherService {
  constructor(private publisher: Publisher){}
  
  publish(data: AisdataCreatedEvent['data']): Observable<string> {
    const aisdataCreatedEventDto = new AisdataCreatedEventDto(data);
    return this.publisher.emit<string, AisdataCreatedEvent['data']>(aisdataCreatedEventDto.pattern, aisdataCreatedEventDto.data)
  }
}

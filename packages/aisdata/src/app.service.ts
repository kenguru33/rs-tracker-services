import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aisdata } from './schemas/aisdata.schema';
import { Model } from 'mongoose';
import { CreateAisdataDto } from './dto/create-aisdata.dto';
import {
  NatsStreamingContext,
  Publisher,
} from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { AisdataCreatedEvent } from '@redningsselskapet/rs-tracker-services-common';
import { plainToClass } from 'class-transformer';
import { AisdataCreatedEventPublisherService } from './publishers/aisdata-created-event-publisher.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Aisdata.name) private AisdataModel: Model<Aisdata>,
    private aisdataCreatedEventPubliser: AisdataCreatedEventPublisherService
  ) {}

  async addAisdata(createAisdataDto: CreateAisdataDto) {
    const aisdata = new this.AisdataModel(createAisdataDto);
    const result = await aisdata.save();
    const aisdataCreatedEvent = plainToClass(AisdataCreatedEvent, result.toJSON())
    this.aisdataCreatedEventPubliser.publish(aisdataCreatedEvent).subscribe(guid => console.log(guid))
  }

  getHello(): string {
    return 'Hello World!';
  }
}

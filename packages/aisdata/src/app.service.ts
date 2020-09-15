import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aisdata } from './schemas/aisdata.schema';
import { Model } from 'mongoose';
import { CreateAisdataDto } from './dto/create-aisdata.dto';
import { NatsStreamingContext, Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { AisdataCreatedEvent } from '@redningsselskapet/rs-tracker-services-common';
import { plainToClass } from 'class-transformer';
import { AisdataCreatedEventDto } from './dto/events/aisdata-created-event.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Aisdata.name) private AisdataModel: Model<Aisdata>, private publisher: Publisher ) {}
  async addAisdata(createAisdataDto: CreateAisdataDto):Promise<Aisdata> {
    const model = new this.AisdataModel(createAisdataDto)
    const result = await model.save()
    const aisdataCreatedEventDto = plainToClass(AisdataCreatedEventDto, result)

    this.publisher.emit<NatsStreamingContext, AisdataCreatedEvent['data']>(aisdataCreatedEventDto.pattern, aisdataCreatedEventDto.data)
    console.log(result.toJSON())
    return result
  }
  getHello(): string {
    return 'Hello World!';
  }
}

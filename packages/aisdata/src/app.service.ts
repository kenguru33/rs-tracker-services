import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aisdata } from './schemas/aisdata.schema';
import { Model } from 'mongoose';
import { CreateAisdataDto } from './dto/create-aisdata-dto';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Patterns } from '@redningsselskapet/rs-tracker-services-common';

@Injectable()
export class AppService {
  constructor(@InjectModel(Aisdata.name) private AisdataModel: Model<Aisdata>, private publisher: Publisher ) {}
  async addAisdata(createAisdataDto: CreateAisdataDto):Promise<Aisdata> {
    const model = new this.AisdataModel(createAisdataDto)
    
    const result = await model.save()
    this.publisher.emit(Patterns.AisdataCreated, result)
    return result
  }
  getHello(): string {
    return 'Hello World!';
  }
}

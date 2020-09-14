import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aisdata } from './schemas/aisdata.schema';
import { Model } from 'mongoose';
import { CreateAisdataDto } from './dto/create-aisdata-dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Aisdata.name) private AisdataModel: Model<Aisdata> ) {}
  async addAisdata(createAisdataDto: CreateAisdataDto):Promise<Aisdata> {
    const model = new this.AisdataModel(createAisdataDto)
    
    const result = await model.save()
    console.log(result)
    return result
  }
  getHello(): string {
    return 'Hello World!';
  }
}

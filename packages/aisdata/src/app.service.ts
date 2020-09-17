import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aisdata } from './schemas/aisdata.schema';
import { Model } from 'mongoose';
import { CreateAisdataDto } from './dto/create-aisdata.dto';
import { QueryAisdataByMmsiDto } from './dto/query-aisdata-by-mmsi.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Aisdata.name) private AisdataModel: Model<Aisdata>,
  ) {}

  async addAisdata(createAisdataDto: CreateAisdataDto): Promise<Aisdata> {
    const aisdata = new this.AisdataModel(createAisdataDto);
    return aisdata.save();
  }

  async getAisdata(
    queryAisdataByMmsiDto: QueryAisdataByMmsiDto,
  ): Promise<Aisdata> {
    return;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aisdata } from './schemas/aisdata.schema';
import { Model } from 'mongoose';
import { CreateAisdataDto } from './dto/create-aisdata.dto';
import { QueryAisdataByMmsiDto } from './dto/query-aisdata-by-mmsi.dto';
import * as moment from 'moment';
import { NoAisdataFoundError } from './errors/NoAisdataFound.error';

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
  ): Promise<Aisdata[]> {
    const { startTime, endTime, mmsi } = queryAisdataByMmsiDto;

    let dataArray = [];
    if (moment.utc(startTime).unix() <= moment.utc(endTime).unix()) {
      dataArray = await this.AisdataModel.find({
        timeStamp: { $gte: startTime, $lte: endTime },
        mmsi,
      }).sort({timeStamp: 1});
    } else {
      dataArray = await this.AisdataModel.find({
        timeStamp: { $lte: startTime, $gte: endTime },
        mmsi,
      }).sort({timeStamp: -1});
    }
    if (dataArray.length === 0) throw new NoAisdataFoundError()
    return dataArray.map(data => {
      return data.toObject({
        transform: (doc, ret) => {
          delete ret.__v;
          delete ret._id;
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.version;
        },
      });
    });
  }
}

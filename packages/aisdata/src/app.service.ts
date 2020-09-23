import { HttpException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aisdata } from './schemas/aisdata.schema';
import { Model } from 'mongoose';
import { CreateAisdataDto } from './dto/create-aisdata.dto';
import { QueryAisdataByMmsiDto } from './dto/query-aisdata-by-mmsi.dto';
import * as moment from 'moment';
import { NoAisdataFoundError } from './errors/NoAisdataFound.error';
import { QueryAisdataOneDto } from './dto/query-aisdata-one.dto';

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

  async getAisdataOne(queryAisdataOneDto: QueryAisdataOneDto): Promise<Aisdata> {
    const {mmsi, timeStamp} = queryAisdataOneDto;
    const timeWindowMinutes: number = 60;
    const unixTime = moment.utc(timeStamp).unix();

    const t1 = moment
      .utc(timeStamp)
      .subtract(timeWindowMinutes / 2, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ss');

    const t2 = moment
      .utc(timeStamp)
      .add(timeWindowMinutes / 2, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ss');

      const aisdataArray = await this.AisdataModel.find({
        timeStamp: { $gte: t1, $lte: t2 },
        mmsi,
      });
  
      let nearestAisdata: Aisdata = null;
      let smallestTimeDiff = (timeWindowMinutes * 1000) / 2;
  
      aisdataArray.forEach(data => {
        const diff = Math.abs(
          unixTime - moment.utc(data.timeStamp).unix(),
        );
  
        if (diff < smallestTimeDiff) {
          smallestTimeDiff = diff;
          nearestAisdata = data;
        }
      });
  
      if (!nearestAisdata) {
        throw new NoAisdataFoundError()
      }
  
      // this.logger.verbose(nearestVesselWeatherPosition);
  
      return nearestAisdata.toObject({
        transform: (doc, ret) => {
          delete ret.__v;
          delete ret._id;
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.version;
        },
      });
    return
  }
}

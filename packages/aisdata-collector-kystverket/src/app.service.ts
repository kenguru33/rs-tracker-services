import { Injectable, HttpService, Logger, Inject } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { KystverketConfig } from './config';
import axiosIntanceCookiejarSupport from 'axios-cookiejar-support';
import { ConfigService } from '@nestjs/config';

import { plainToClass } from 'class-transformer';
import { AisdataDto } from './dto/aisdata.dto';
import tough = require('tough-cookie');
import { Interval } from '@nestjs/schedule';
import { validate, validateSync } from 'class-validator';
import { Aisdata } from './interfaces/aisdata.interface';
import {
  Patterns,
  NewAisdataEvent,
} from '@redningsselskapet/rs-tracker-services-common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';

@Injectable()
export class AppService {
  private axiosIntance: AxiosInstance;
  private config: KystverketConfig;

  private lastPublihedAisdata: Aisdata[] = [];

  constructor(
    private configService: ConfigService,
    private http: HttpService,
    private logger: Logger,
    private publisher: Publisher,
  ) {
    this.config = this.configService.get<KystverketConfig>('kystverket');
    const { login, password } = this.config;
    
    this.axiosIntance = this.http.axiosRef;
    axiosIntanceCookiejarSupport(this.axiosIntance);
    this.axiosIntance.defaults.withCredentials = true;
    this.axiosIntance.defaults.jar = new tough.CookieJar();
    this.axiosIntance.defaults.headers = {
      Authorization:
        'Basic ' + Buffer.from(login + ':' + password).toString('base64'),
    };
    this.fetchAisData();
  }

  @Interval(2000)
  async fetchAisData() {
    const { url } = this.config;
    const aisdata: any = (await this.axiosIntance.get(url)).data;
    const transformedAisdata = this.transferToAisdataDto(aisdata);
    const validatedAisdata = await this.filterInvalidAisdata(
      transformedAisdata,
    );
    const aisdataToPublish = this.filterPublished(validatedAisdata);
    this.publishNewAisdata(aisdataToPublish);
  }

  private transferToAisdataDto(aisdata: any): AisdataDto[] {
    return plainToClass<AisdataDto, AisdataDto[]>(AisdataDto, aisdata, {
      excludeExtraneousValues: true,
    });
  }

  private async filterInvalidAisdata(
    aisdata: AisdataDto[],
  ): Promise<AisdataDto[]> {
    const markInvalidDataByNull = await Promise.all(
      aisdata.map(async data => {
        const error = await validate(data);
        if (error.length > 0) {
          this.logger.error(
            `Invalid ${error[0].property} value: ${error[0].value} (mmsi: ${data.mmsi})`,
          );
          return null;
        }
        return data;
      }),
    );

    return markInvalidDataByNull.filter(data => data);
  }

  private filterPublished(aisdata: Aisdata[]) {
    return aisdata.filter(data => {
      const index = this.lastPublihedAisdata.findIndex(publishedAisdata => {
        return (
          publishedAisdata.mmsi + publishedAisdata.timeStamp ===
          data.mmsi + data.timeStamp
        );
      });
      return index === -1;
    });
  }

  private updateLastPublished(aisdata: Aisdata) {
    const index = this.lastPublihedAisdata.findIndex(
      data => data.mmsi === aisdata.mmsi,
    );

    if (index >= 0) {
      this.lastPublihedAisdata[index] = aisdata;
    } else {
      this.lastPublihedAisdata.push(aisdata);
    }
  }

  publishNewAisdata(aisdata: Aisdata[]) {
    aisdata.forEach(data => {
      this.publisher
        .emit<string, NewAisdataEvent>(Patterns.NewAisdata, data)
        .subscribe(
          guid => {
            this.logger.log('Published message with guid: ' + guid);
          },
          error => console.log(error.message),
        );
      this.updateLastPublished(data);
    });
  }

  getlastPublihedAisdata(): Aisdata[] {
    return this.lastPublihedAisdata;
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Patterns} from '@redningsselskapet/rs-tracker-services-common'
import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
} from '@nestjs/microservices';
import { Aisdata } from './interfaces/aisdata.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  aisdata(): Aisdata[] {
    return this.appService.getlastPublihedAisdata();
  }
}

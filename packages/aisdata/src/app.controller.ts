import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import {
  Patterns,
  AisdataCollectedEvent,
} from '@redningsselskapet/rs-tracker-services-common';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { AisdataCreatedEventPublisherService } from './publishers/aisdata-created-event-publisher.service';
import { AisdataCreatedEventDto } from './dto/aisdata-created-event.dto';
import { AisdataCollectedEventDto } from './dto/aisdata-collected-event.dto';
import { CreateAisdataDto } from './dto/create-aisdata.dto';
import { QueryAisdataByMmsiDto } from './dto/query-aisdata-by-mmsi.dto';
import { QueryAisdataOneDto } from './dto/query-aisdata-one.dto';

@Controller('/api/aisdata')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly aisdataCreatedPublisher: AisdataCreatedEventPublisherService,
    private logger: Logger,
  ) {}

  @Get(':mmsi/:startTime/:endTime')
  async getAisdataByMmsi(
    @Param(new ValidationPipe()) query: QueryAisdataByMmsiDto,
  ) {
    return this.appService.getAisdata(query);
  }

  @Get(':mmsi/:timeStamp')
  async getAisdataOne(@Param(new ValidationPipe()) query: QueryAisdataOneDto) {
    return this.appService.getAisdataOne(query);
  }

  // this is just for testing - to be removed
  @EventPattern(Patterns.AisdataCreated)
  async aisdataCreatedHandler(
    @Payload(new ValidationPipe())
    data: AisdataCreatedEventDto,
    @Ctx() ctx: NatsStreamingContext,
  ) {
    console.log('KOKOKOKOKOKO')
    this.logger.log('received: ' + ctx.message.getSubject(), 'aisdata');
    ctx.message.ack();
  }

  @EventPattern(Patterns.AisdataCollected)
  async aisdataCollectedEventHandler(
    @Payload(new ValidationPipe())
    data: CreateAisdataDto,
    @Ctx() ctx: NatsStreamingContext,
  ) {
    try {
      const aisdata = await this.appService.addAisdata(data);
      this.logger.log('received: ' + ctx.message.getSubject(), 'aisdata');
      ctx.message.ack();
      this.aisdataCreatedPublisher.publish(aisdata.toJSON());
    } catch (error) {
      console.log(error);
    }
  }
}

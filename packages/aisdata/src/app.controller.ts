import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
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

@Controller('/api/aisdata')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly aisdataCreatedPublisher: AisdataCreatedEventPublisherService,
  ) {}

  @EventPattern(Patterns.AisdataCreated)
  async aisdataCreatedHandler(
    @Payload(new ValidationPipe())
    data: AisdataCreatedEventDto,
    @Ctx() ctx: NatsStreamingContext,
  ) {
    console.log('received data: ', data);
  }

  @EventPattern(Patterns.AisdataCollected)
  async aisdataCollectedEventHandler(
    @Payload(new ValidationPipe())
    data: CreateAisdataDto,
    @Ctx() ctx: NatsStreamingContext,
  ) {
    try {
      const aisdata = await this.appService.addAisdata(data);
      this.aisdataCreatedPublisher.publish(aisdata.toJSON());
      ctx.message.ack();
    } catch (error) {
      console.log(error);
    }
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import {
  Patterns,
  NewAisdataEvent,
} from '@redningsselskapet/rs-tracker-services-common';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(Patterns.NewAisdata)
  newAisdata(
    @Payload() data: NewAisdataEvent,
    @Ctx() ctx: NatsStreamingContext,
  ) {
    console.log('new event recevied:' + data.mmsi);
    ctx.message.ack();
  }
}

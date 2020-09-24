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

@Controller('/api/aisdata')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: Logger,
  ) {}

  // this is just for testing - to be removed
  @EventPattern(Patterns.AisdataCreated)
  async aisdataCreatedHandler(
    @Payload()
    data,
    @Ctx() ctx: NatsStreamingContext,
  ) {
    console.log('created')
  }
}

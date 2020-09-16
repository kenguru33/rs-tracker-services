import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import {
  Patterns,
  NewAisdataEvent,
} from '@redningsselskapet/rs-tracker-services-common';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { AisdataEventTranslator } from './pipes/aisdata-event-translator.pipe';
import { AisdataCreatedEventDto } from './dto/events/aisdata-created-event.dto';

@Controller('/api/aisdata')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(Patterns.NewAisdata)
  async newAisdataEventHandler(
    @Payload(new AisdataEventTranslator()) data: NewAisdataEvent,
    @Ctx() ctx: NatsStreamingContext,
  ) {
    try {
      await this.appService.addAisdata(data)
      ctx.message.ack();
    } catch(error) {
      console.log(error)
    }
  }
}

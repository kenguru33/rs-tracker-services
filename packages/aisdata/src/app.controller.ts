import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import {
  Patterns,
  NewAisdataEvent,
  AisdataCreatedEvent,
} from '@redningsselskapet/rs-tracker-services-common';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { AisdataEventTranslator } from './pipes/aisdata-collected-event-translator.pipe';
import { AisdataCreatedEventPublisherService } from './publishers/aisdata-created-event-publisher.service';
import { AisdataCreatedEventDto } from './dto/aisdata-created-event.dto';
import { Aisdata } from './schemas/aisdata.schema';

@Controller('/api/aisdata')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly aisdataCreatedPublisher: AisdataCreatedEventPublisherService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(Patterns.AisdataCreated)
  async aisdataCreatedHandler(@Payload() data: AisdataCreatedEvent['data'], @Ctx() ctx: NatsStreamingContext) {
    console.log('received data: ', data.id)
  }

  @EventPattern(Patterns.NewAisdata)
  async newAisdataEventHandler(
    @Payload(new AisdataEventTranslator()) data: NewAisdataEvent,
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

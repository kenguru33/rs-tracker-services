import { MovingVesselPublisherService } from './publishers/moving-vessel-publisher.service';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}

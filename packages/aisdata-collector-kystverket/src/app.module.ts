import { Module, HttpModule, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ScheduleModule } from '@nestjs/schedule';
import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { AisdataCollectedPublisherService } from './aisdata-collected-publisher.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    NatsStreamingTransport.forRoot(
      'rs-tracker-services',
      'aisdata-collector-kystverket',
      {
        url: 'http://nats-streaming-srv:4222',
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService, Logger, AisdataCollectedPublisherService],
})
export class AppModule {}

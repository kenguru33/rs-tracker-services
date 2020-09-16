import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AisdataSchema, Aisdata } from './schemas/aisdata.schema';
import { AisdataCreatedEventPublisherService } from './publishers/aisdata-created-event-publisher.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://aisdata-mongo-srv'),
    MongooseModule.forFeature([{ name: Aisdata.name, schema: AisdataSchema }]),
    NatsStreamingTransport.forRoot(
      'rs-tracker-services'/* clusterID */,
      'aisdata-service-publisher'/* clientID */, 
      {
        url: 'http://nats-streaming-srv:4222',
      } /* TransportConnectOptions */
    ),
  ],
  controllers: [AppController],
  providers: [AppService, AisdataCreatedEventPublisherService],
})
export class AppModule {}

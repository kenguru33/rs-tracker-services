import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { CustomStrategy } from '@nestjs/microservices';
async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new Listener(
      'rs-tracker-services' /* clusterID */,
      'aisdata-kystverket-listener' /* clientID */,
      'aisdata' /* queueGroupName */,
      {
        url: 'http://nats-streaming-srv:4222',
        maxReconnectAttempts: -1, // try forever
        waitOnFirstConnect: true,
        reconnectTimeWait: 2,
        // https://github.com/nats-io/stan.js/issues/80
      } /* TransportConnectOptions */,
      {
        durableName: 'aisdata',
        manualAckMode: true,
        deliverAllAvailable: true,
      } /* TransportSubscriptionOptions */,
    ),
  };
  

  // hybrid microservice and web application
  const app = await NestFactory.create(AppModule);
  const microService = app.connectMicroservice(options);
  microService.listen(() => app.listen(3000));
}
bootstrap();

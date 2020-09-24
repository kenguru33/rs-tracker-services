import { MovingVesselPublisherService } from './publishers/moving-vessel-publisher.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
        MovingVesselPublisherService, AppService],
})
export class AppModule {}

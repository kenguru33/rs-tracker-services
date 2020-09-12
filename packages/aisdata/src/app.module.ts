import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://aisdata-mongo-srv'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AisdataSchema, Aisdata } from './schemas/aisdata.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://aisdata-mongo-srv'),
    MongooseModule.forFeature([{ name: Aisdata.name, schema: AisdataSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Aisdata extends Document {
  
  @Prop({ required: true, validate: /^\d{9}$/ })
  mmsi: string;
  
  @Prop({required: true, max: 90, min: -90})
  lat: number;

  @Prop({require: true, max: 180, min: -180})
  lng: number;
  
  @Prop({required: true, min: 0})
  sog: number;
  
  @Prop({required: true, max: 360, min: 0})
  cog: number;
  
  @Prop({required: true})
  timeStamp: string;
}


export const AisdataSchema = SchemaFactory.createForClass(Aisdata).index({mmsi: 1, timeStamp: 1},{uuique: true}).index({createdAt: 1},{expires: '365d'}).set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 
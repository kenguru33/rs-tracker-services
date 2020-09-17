import { AisdataCollectedEvent } from '@redningsselskapet/rs-tracker-services-common';
import {
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class AisdataCollectedEventDto implements AisdataCollectedEvent {
  @IsNumberString()
  mmsi: string;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  sog: number;

  @IsNumber()
  cog: number;

  @IsDateString()
  timeStamp: string;
}

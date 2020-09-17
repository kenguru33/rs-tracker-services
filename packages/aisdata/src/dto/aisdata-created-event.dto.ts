import {
  AisdataCreatedEvent,
  Patterns,
} from '@redningsselskapet/rs-tracker-services-common';
import {
  IsDataURI,
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class AisdataCreatedEventDto implements AisdataCreatedEvent {
  @IsString()
  id: string;

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

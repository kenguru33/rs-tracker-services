import { IsCog, IsMmsi, IsSog } from '@redningsselskapet/class-validator-ais';
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

  @IsMmsi()
  mmsi: string;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsSog()
  sog: number;

  @IsCog()
  cog: number;

  @IsDateString()
  timeStamp: string;
}

import { IsCog, IsMmsi, IsSog } from '@redningsselskapet/class-validator-ais';
import { AisdataCollectedEvent } from '@redningsselskapet/rs-tracker-services-common';
import {
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class AisdataCollectedEventDto implements AisdataCollectedEvent {
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

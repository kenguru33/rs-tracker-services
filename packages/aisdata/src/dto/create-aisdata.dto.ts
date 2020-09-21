import { IsCog, IsMmsi, IsSog } from '@redningsselskapet/class-validator-ais';
import {
  IsNumberString,
  IsNumber,
  IsDateString,
  Length,
  IsLatitude,
  IsLongitude,
  Max,
  Min,
} from 'class-validator';
export class CreateAisdataDto {
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

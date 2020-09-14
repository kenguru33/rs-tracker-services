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
  @IsNumberString({ no_symbols: true })
  @Length(9, 9)
  mmsi: string;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(0)
  sog: number;

  @IsNumber()
  @Max(359)
  @Min(0)
  cog: number;

  @IsDateString()
  timeStamp: string;
}

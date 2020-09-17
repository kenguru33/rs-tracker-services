import { IsDateString, IsNumberString } from 'class-validator';

export class QueryAisdataByMmsiDto {
  @IsNumberString({ no_symbols: true })
  mmsi: string;
  @IsDateString()
  startTime: string;
  @IsDateString()
  endTime: string;
}

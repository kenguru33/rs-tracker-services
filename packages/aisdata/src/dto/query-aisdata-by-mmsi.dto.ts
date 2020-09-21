import {
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { IsBeforeDate, IsAfterDate } from 'class-validator-date';
export class QueryAisdataByMmsiDto {
  @IsNumberString({ no_symbols: true })
  mmsi: string;
  @IsDateString()
  @IsBeforeDate('endTime')
  startTime: string;
  @IsDateString()
  endTime: string;
}

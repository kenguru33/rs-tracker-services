import { IsMmsi } from '@redningsselskapet/class-validator-ais';
import {
  IsDateString,
} from 'class-validator';
import { IsBeforeDate, IsAfterDate } from 'class-validator-date';
export class QueryAisdataByMmsiDto {
  @IsMmsi()
  mmsi: string;
  @IsDateString()
  startTime: string;
  @IsDateString()
  endTime: string;
}

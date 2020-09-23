import { IsMmsi } from "@redningsselskapet/class-validator-ais"
import { IsDateString } from "class-validator"

export class QueryAisdataOneDto {
  @IsMmsi()
  mmsi: string
  @IsDateString()
  timeStamp: string
}
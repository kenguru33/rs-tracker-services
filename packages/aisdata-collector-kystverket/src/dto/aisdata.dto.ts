import { Aisdata } from '../interfaces/aisdata.interface';
import { IsNumberString, IsNumber, IsDateString, IsLatitude, isLongitude, IsLongitude } from 'class-validator'
import { Transform, Expose } from "class-transformer";
import { IsCog, IsMmsi, IsSog } from '@redningsselskapet/class-validator-ais';
export class AisdataDto implements Aisdata {
    
    @IsMmsi()
    @Expose({name: 'MMSI'})
    mmsi: string;
    
    @IsLatitude()
    @Expose({name: 'Decimal_Latitude'})
    @Transform(value => parseFloat(value))
    lat: number;

    @IsLongitude()
    @Expose({name: 'Decimal_Longitude'})
    @Transform(value => parseFloat(value))
    lng: number;

    @IsSog()
    @Expose({name: 'SOG'})
    @Transform(value => parseFloat(value) || 0)
    sog: number;

    @IsCog()
    @Expose({name: 'COG'})
    @Transform(value => parseFloat(value) || 0)
    cog: number;

    @IsDateString()
    @Expose({name: 'Time_stamp'})
    timeStamp: string;
}
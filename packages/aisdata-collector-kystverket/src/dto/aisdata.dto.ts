import { Aisdata } from '../interfaces/aisdata.interface';
import { IsNumberString, IsNumber, IsDateString } from 'class-validator'
import { Transform, Expose } from "class-transformer";
export class AisdataDto implements Aisdata {
    
    @IsNumberString()
    @Expose({name: 'MMSI'})
    mmsi: string;
    
    @IsNumber()
    @Expose({name: 'Decimal_Latitude'})
    @Transform(value => parseFloat(value))
    lat: number;

    @IsNumber()
    @Expose({name: 'Decimal_Longitude'})
    @Transform(value => parseFloat(value))
    lng: number;

    @IsNumber()
    @Expose({name: 'SOG'})
    @Transform(value => parseFloat(value) || 0)
    sog: number;

    @IsNumber()
    @Expose({name: 'COG'})
    @Transform(value => parseFloat(value) || 0)
    cog: number;

    @IsDateString()
    @Expose({name: 'Time_stamp'})
    timeStamp: string;
}
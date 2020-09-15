import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { CreateAisdataDto } from "../dto/create-aisdata.dto"
import {} from "class-transformer"
export class MMSIValidationPipe implements PipeTransform<any,string> {
  
  transform(value: any): string {
    if (/^\d{9}$/ .test(value)) {
      return value;
    }
    throw new Error('mmsi is not valid');
  }
}
import { PipeTransform, ArgumentMetadata, ValidationPipe } from "@nestjs/common";
import { CreateAisdataDto } from "src/dto/create-aisdata.dto";
import { AisdataCollectedEvent } from "@redningsselskapet/rs-tracker-services-common";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export class AisdataCollectedEventTranslator implements PipeTransform<AisdataCollectedEvent, Promise<CreateAisdataDto>>{
  async transform(value: AisdataCollectedEvent): Promise<CreateAisdataDto> {
    const data: CreateAisdataDto = plainToClass(CreateAisdataDto, value)
    const error: ValidationError[] = await validate(data)
    if (error.length > 0) {
      throw new Error(error[0].toString())
    }
    return data
  }
  
}


import {
  IsDateString,
  IsNumberString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import * as moment from 'moment';
export class QueryAisdataByMmsiDto {
  @IsNumberString({ no_symbols: true })
  mmsi: string;
  @IsDateString()
  @IsBeforeDate('endTime')
  startTime: string;
  @IsDateString()
  endTime: string;
}

export function IsBeforeDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBeforeDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return moment.utc(value).unix() < moment.utc(relatedValue).unix(); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
        defaultMessage(args: ValidationArguments) {
          // here you can provide default error message if validation failed
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return `${args.property} ($value) must be before ${[
            relatedPropertyName,
          ]} (${relatedValue})`;
        },
      },
    });
  };
}

export function IsAfterDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAfterDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return moment.utc(value).unix() > moment.utc(relatedValue).unix(); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
        defaultMessage(args: ValidationArguments) {
          // here you can provide default error message if validation failed
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return `${args.property} ($value) must be after ${[
            relatedPropertyName,
          ]} (${relatedValue})`;
        },
      },
    });
  };
}

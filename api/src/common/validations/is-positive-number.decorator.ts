import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPositiveNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPositiveNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'El valor debe ser un número positivo mayor que cero',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === null || value === undefined || value === '') {
            return false;
          }

          const num = typeof value === 'number' ? value : parseFloat(value);
          
          if (isNaN(num)) {
            return false;
          }

          return num > 0;
        },
        defaultMessage(args: ValidationArguments): string {
          return `La propiedad '${args.property}' debe ser un número positivo mayor que cero`;
        },
      },
    });
  };
}

export function IsNonNegativeNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNonNegativeNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'El valor debe ser un número mayor o igual a cero',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === null || value === undefined || value === '') {
            return false;
          }

          const num = typeof value === 'number' ? value : parseFloat(value);
          
          if (isNaN(num)) {
            return false;
          }

          return num >= 0;
        },
        defaultMessage(args: ValidationArguments): string {
          return `La propiedad '${args.property}' debe ser un número mayor o igual a cero`;
        },
      },
    });
  };
}
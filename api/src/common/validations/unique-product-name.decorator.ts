import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Injectable, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UniqueProductNameValidator {
  constructor(
    @Inject('ProductRepository') 
    private readonly productRepository: ProductRepository,
  ) {}

  async validate(name: string): Promise<boolean> {
    if (!name || name.trim() === '') {
      return false;
    }

    const existingProduct = await this.productRepository.findByName(name);
    return !existingProduct;
  }

  defaultMessage(args: ValidationArguments): string {
    return `El nombre '${args.value}' ya está en uso por otro producto`;
  }
}

export function UniqueProductName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'uniqueProductName',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'El nombre del producto ya existe en el sistema',
        ...validationOptions,
      },
      validator: {
        async validate(value: any, args: ValidationArguments) {
          if (!value || typeof value !== 'string' || value.trim() === '') {
            return false;
          }

          const reflector = args.object['reflector'] as Reflector;
          if (!reflector) {
            return true;
          }

          const validator = reflector.get('uniqueProductNameValidator', args.object.constructor);
          if (!validator) {
            return true;
          }

          return await validator.validate(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `El nombre '${args.value}' ya está en uso por otro producto`;
        },
      },
    });
  };
}

export function IsValidProductName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidProductName',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'El nombre del producto debe tener entre 3 y 100 caracteres, solo letras, números, espacios, guiones y guiones bajos',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          if (!value || typeof value !== 'string') {
            return false;
          }

          const trimmed = value.trim();
          
          if (trimmed.length < 3 || trimmed.length > 100) {
            return false;
          }

          const validPattern = /^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/;
          return validPattern.test(trimmed);
        },
        defaultMessage(args: ValidationArguments): string {
          return `El nombre del producto debe tener entre 3 y 100 caracteres y solo puede contener letras, números, espacios, guiones y guiones bajos`;
        },
      },
    });
  };
}
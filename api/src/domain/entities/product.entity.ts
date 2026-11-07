import { IsString, IsNumber, IsPositive, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueProductName } from '../../common/validations/unique-product-name.decorator';


export class Product {
  @ApiProperty({ example: '1', description: 'Identificador único del producto' })
  id: string;

  @ApiProperty({ example: 'Laptop Gamer', description: 'Nombre del producto' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @UniqueProductName({ message: 'El nombre del producto debe ser único' })
  name: string;

  @ApiProperty({ example: 1500.99, description: 'Precio del producto' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad en stock del producto' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @ApiProperty({ example: 'Electrónicos', description: 'Categoría del producto' })
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  category: string;

  constructor(
    id: string,
    name: string,
    price: number,
    stock: number,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.price <= 0) {
      throw new Error('El precio debe ser un número positivo');
    }
    if (this.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    if (!this.name || this.name.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }
    if (!this.category || this.category.trim() === '') {
      throw new Error('La categoría no puede estar vacía');
    }
  }

  updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error('El precio debe ser un número positivo');
    }
    this.price = newPrice;
  }

  updateStock(newStock: number): void {
    if (newStock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    this.stock = newStock;
  }

  updateCategory(newCategory: string): void {
    if (!newCategory || newCategory.trim() === '') {
      throw new Error('La categoría no puede estar vacía');
    }
    this.category = newCategory;
  }
}
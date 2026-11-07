import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findByName(createProductDto.name);
    
    if (existingProduct) {
      throw new ConflictException(
        `El producto con nombre '${createProductDto.name}' ya existe en el sistema.`
      );
    }

    if (createProductDto.price < 0) {
      throw new BadRequestException('El precio del producto no puede ser negativo.');
    }

    if (createProductDto.stock < 0) {
      throw new BadRequestException('El stock del producto no puede ser negativo.');
    }

    const productData = {
      name: createProductDto.name,
      price: createProductDto.price,
      stock: createProductDto.stock,
      category: createProductDto.category,
    };

    return await this.productRepository.create(productData);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findById(id: string): Promise<Product> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del producto es requerido.');
    }

    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new NotFoundException(`Producto con ID '${id}' no encontrado.`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID '${id}' no encontrado.`);
    }

    if (updateProductDto.name && updateProductDto.name !== existingProduct.name) {
      const productWithSameName = await this.productRepository.findByName(updateProductDto.name);
      
      if (productWithSameName && productWithSameName.id !== id) {
        throw new ConflictException(
          `El nombre '${updateProductDto.name}' ya está en uso por otro producto.`
        );
      }
    }

    if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
      throw new BadRequestException('El precio del producto no puede ser negativo.');
    }

    if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
      throw new BadRequestException('El stock del producto no puede ser negativo.');
    }

    const updateData: Partial<Omit<Product, 'id'>> = {};
    
    if (updateProductDto.name !== undefined) {
      updateData.name = updateProductDto.name;
    }
    if (updateProductDto.price !== undefined) {
      updateData.price = updateProductDto.price;
    }
    if (updateProductDto.stock !== undefined) {
      updateData.stock = updateProductDto.stock;
    }
    if (updateProductDto.category !== undefined) {
      updateData.category = updateProductDto.category;
    }

    return await this.productRepository.update(id, updateData);
  }

  async delete(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del producto es requerido.');
    }

    const existingProduct = await this.productRepository.findById(id);
    
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID '${id}' no encontrado.`);
    }

    return await this.productRepository.delete(id);
  }

  async findByName(name: string): Promise<Product | null> {
    if (!name || name.trim() === '') {
      return null;
    }
    
    return await this.productRepository.findByName(name);
  }
}
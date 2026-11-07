import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Product as PrismaProduct } from '@prisma/client';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';


@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    try {
      const createdProduct = await this.prisma.product.create({
        data: {
          name: productData.name,
          price: productData.price,
          stock: productData.stock,
          category: productData.category,
        },
      });
      return this.mapToDomain(createdProduct);
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany();
      return products.map((product) => this.mapToDomain(product));
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
      return product ? this.mapToDomain(product) : null;
    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }

  async update(id: string, productData: Partial<Omit<Product, 'id'>>): Promise<Product> {
    try {
      const existingProduct = await this.findById(id);
      if (!existingProduct) {
        throw new NotFoundException('Producto no encontrado');
      }

      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          name: productData.name,
          price: productData.price,
          stock: productData.stock,
          category: productData.category,
        },
      });
      return this.mapToDomain(updatedProduct);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const existingProduct = await this.findById(id);
      if (!existingProduct) {
        throw new NotFoundException('Producto no encontrado');
      }

      await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }

  async findByName(name: string): Promise<Product | null> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { name },
      });
      return product ? this.mapToDomain(product) : null;
    } catch (error) {
      throw new Error(`Error al buscar producto por nombre: ${error.message}`);
    }
  }

  private mapToDomain(prismaProduct: PrismaProduct): Product {
    return new Product(
      prismaProduct.id,
      prismaProduct.name,
      prismaProduct.price,
      prismaProduct.stock,
      prismaProduct.category
    );
  }
}
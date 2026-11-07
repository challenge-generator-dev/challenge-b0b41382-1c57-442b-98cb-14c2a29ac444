import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductSchema, ProductDocument } from '../../schemas/product.schema';

@Injectable()
export class ProductNosqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductNosqlRepository.name);

  constructor(
    @InjectModel(ProductSchema.name) private readonly productModel: Model<ProductDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.logger.log('ProductNosqlRepository inicializado con conexión a MongoDB');
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    this.logger.debug(`Creando producto: ${productData.name}`);

    const existingProduct = await this.findByName(productData.name);
    if (existingProduct) {
      throw new BadRequestException(
        `El producto con nombre '${productData.name}' ya existe`
      );
    }

    const createdProduct = new this.productModel({
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      category: productData.category,
      description: (productData as any).description,
      isActive: (productData as any).isActive ?? true,
    });

    const savedProduct = await createdProduct.save();
    this.logger.log(`Producto creado exitosamente con ID: ${savedProduct._id}`);

    return this.mapToDomain(savedProduct);
  }

  async findAll(): Promise<Product[]> {
    this.logger.debug('Obteniendo todos los productos');
    const products = await this.productModel.find({ isActive: true }).exec();
    this.logger.debug(`Se encontraron ${products.length} productos`);

    return products.map((p) => this.mapToDomain(p));
  }

  async findById(id: string): Promise<Product | null> {
    this.logger.debug(`Buscando producto por ID: ${id}`);
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      this.logger.warn(`Producto con ID ${id} no encontrado`);
      return null;
    }

    return this.mapToDomain(product);
  }

  async update(id: string, productData: Partial<Omit<Product, 'id'>>): Promise<Product> {
    this.logger.debug(`Actualizando producto con ID: ${id}`);

    const existingProduct = await this.productModel.findById(id).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    if (productData.name && productData.name !== existingProduct.name) {
      const nameExists = await this.productModel.findOne({
        name: productData.name,
        _id: { $ne: id },
      });
      if (nameExists) {
        throw new BadRequestException(
          `Ya existe otro producto con el nombre '${productData.name}'`
        );
      }
    }

    const updatedFields: any = {};
    if (productData.name !== undefined) updatedFields.name = productData.name;
    if (productData.price !== undefined) updatedFields.price = productData.price;
    if (productData.stock !== undefined) updatedFields.stock = productData.stock;
    if (productData.category !== undefined) updatedFields.category = productData.category;
    if ((productData as any).description !== undefined) {
      updatedFields.description = (productData as any).description;
    }
    if ((productData as any).isActive !== undefined) {
      updatedFields.isActive = (productData as any).isActive;
    }

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updatedFields, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado después de actualizar`);
    }

    this.logger.log(`Producto ${id} actualizado exitosamente`);
    return this.mapToDomain(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    this.logger.debug(`Eliminando producto con ID: ${id}`);

    const result = await this.productModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    this.logger.log(`Producto ${id} eliminado exitosamente`);
  }

  async findByName(name: string): Promise<Product | null> {
    this.logger.debug(`Buscando producto por nombre: ${name}`);
    const product = await this.productModel.findOne({ name }).exec();

    if (!product) {
      return null;
    }

    return this.mapToDomain(product);
  }

  private mapToDomain(mongoProduct: ProductDocument): Product {
    return new Product(
      mongoProduct._id.toString(),
      mongoProduct.name,
      mongoProduct.price,
      mongoProduct.stock,
      mongoProduct.category,
      mongoProduct.description,
      mongoProduct.isActive,
    );
  }
}
import { Product } from '../entities/product.entity';


export interface ProductRepository {
  create(product: Omit<Product, 'id'>): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Omit<Product, 'id'>>): Promise<Product>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Product | null>;
}
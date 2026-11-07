import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = ProductSchema & Document;

@Schema({ timestamps: true, collection: 'products' })
export class ProductSchema {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop({ required: true })
  category: string;

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchemaDefinition = SchemaFactory.createForClass(ProductSchema);

ProductSchemaDefinition.index({ name: 1 }, { unique: true });
ProductSchemaDefinition.index({ category: 1 });
ProductSchemaDefinition.index({ price: 1 });
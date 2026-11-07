import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductRepository } from './domain/repositories/product.repository';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/nosql/product-nosql.repository';
import { ProductSchema } from './infrastructure/schemas/product.schema';
import { configuration } from './infrastructure/config/configuration';
import { MongoDbConfigService } from './infrastructure/config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useClass: MongoDbConfigService,
    }),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: ProductSqlRepository,
    },
    ProductNosqlRepository,
    MongoDbConfigService,
  ],
  exports: [ProductRepository, ProductService],
})
export class AppModule {}
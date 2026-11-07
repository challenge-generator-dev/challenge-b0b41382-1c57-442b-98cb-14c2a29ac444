import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { Product } from '../../domain/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({
    status: 201,
    description: 'El producto ha sido creado correctamente',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un producto con ese nombre',
  })
  @ApiBody({ type: CreateProductDto })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Error al crear el producto',
          error: error.message,
        });
      }
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente',
    type: [Product],
  })
  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Error al obtener los productos',
          error: error.message,
        });
      }
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del producto',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado correctamente',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  async getProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product> {
    try {
      const product = await this.productService.findById(id);
      if (!product) {
        throw new NotFoundException({
          message: `Producto con ID ${id} no encontrado`,
          error: 'Not Found',
        });
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Error al obtener el producto',
          error: error.message,
        });
      }
      throw new InternalServerErrorException('Error al obtener el producto');
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({
    name: 'id',
    description: 'UUID del producto a actualizar',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.productService.update(id, updateProductDto);
      if (!product) {
        throw new NotFoundException({
          message: `Producto con ID ${id} no encontrado`,
          error: 'Not Found',
        });
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Error al actualizar el producto',
          error: error.message,
        });
      }
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiParam({
    name: 'id',
    description: 'UUID del producto a eliminar',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Producto eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  async deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    try {
      const product = await this.productService.findById(id);
      if (!product) {
        throw new NotFoundException({
          message: `Producto con ID ${id} no encontrado`,
          error: 'Not Found',
        });
      }
      await this.productService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Error al eliminar el producto',
          error: error.message,
        });
      }
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }
}
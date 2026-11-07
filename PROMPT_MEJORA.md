# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261106212220607), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD en bases de datos SQL y NoSQL
- Tiempo estimado: 6 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Implementación de operaciones CRUD en base de datos SQL — objetivo: Implementar las operaciones CRUD en una base de datos SQL para gestionar productos. — entregable (NO resolver): Base de datos SQL con tabla de productos y operaciones CRUD implementadas.
- Fase 2: Implementación de operaciones CRUD en base de datos NoSQL — objetivo: Implementar las operaciones CRUD en una base de datos NoSQL para gestionar productos. — entregable (NO resolver): Base de datos NoSQL con colección de productos y operaciones CRUD implementadas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/src/app.module.ts ===
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

// === ARCHIVO: api/package.json ===
{
  "name": "inventory-api",
  "version": "1.0.0",
  "description": "API para gestión de inventarios con operaciones CRUD en SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node dist/main.js",
    "start:dev": "ts-node-dev src/main.ts",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint \"src/**/*.ts\""
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.4.0",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "prisma": "^5.19.0",
    "@prisma/client": "^5.19.0",
    "mongoose": "^8.5.1",
    "@nestjs/config": "^3.2.3",
    "@nestjs/mongoose": "^10.0.10",
    "rxjs": "^7.8.1",
    "reflect-metadata": "^0.2.2"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-node": "^10.9.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.7.0",
    "@types/node": "^20.14.0",
    "@types/jest": "^29.5.12",
    "@types/supertest": "^6.0.2",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "prettier": "^3.3.2"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true
  },
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de pipes para validación
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('API para gestión de productos en inventario')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

// === ARCHIVO: api/src/domain/entities/product.entity.ts ===
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

// === ARCHIVO: api/src/domain/repositories/product.repository.ts ===
import { Product } from '../entities/product.entity';


export interface ProductRepository {
  create(product: Omit<Product, 'id'>): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Omit<Product, 'id'>>): Promise<Product>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Product | null>;
}

// === ARCHIVO: api/src/infrastructure/repositories/sql/product-sql.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product-nosql.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/product.controller.ts ===
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

// === ARCHIVO: api/src/infrastructure/config/mongodb.config.ts ===
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongoDbConfigService implements MongooseOptionsFactory {
  private readonly logger = new Logger(MongoDbConfigService.name);
  private readonly host: string;
  private readonly port: number;
  private readonly database: string;
  private readonly username: string;
  private readonly password: string;

  constructor(private readonly configService: ConfigService) {
    this.host = this.configService.get<string>('MONGODB_HOST', 'localhost');
    this.port = this.configService.get<number>('MONGODB_PORT', 27017);
    this.database = this.configService.get<string>('MONGODB_DATABASE', 'inventory_nosql');
    this.username = this.configService.get<string>('MONGODB_USERNAME', 'root');
    this.password = this.configService.get<string>('MONGODB_PASSWORD', 'root');

    this.logger.log(`MongoDB configuration loaded: ${this.host}:${this.port}/${this.database}`);
  }

  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.buildConnectionUri();
    
    this.logger.debug(`Building MongoDB connection URI: ${this.getMaskedUri()}`);

    return {
      uri,
      dbName: this.database,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryAttempts: 3,
      retryDelay: 1000,
      autoCreate: true,
      autoIndex: true,
    };
  }

  private buildConnectionUri(): string {
    const hasCredentials = this.username && this.password;
    
    if (hasCredentials) {
      return `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}?authSource=admin`;
    }

    return `mongodb://${this.host}:${this.port}/${this.database}`;
  }

  private getMaskedUri(): string {
    const hasCredentials = this.username && this.password;
    
    if (hasCredentials) {
      return `mongodb://${this.username}:****@${this.host}:${this.port}/${this.database}`;
    }

    return `mongodb://${this.host}:${this.port}/${this.database}`;
  }

  getConnectionName(): string {
    return 'nosql';
  }
}

@Injectable()
export class MongoDbConfig implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MongoDbConfig.name);

  constructor(private readonly configService: ConfigService) {
    this.logger.log('MongoDbConfig provider initialized');
  }

  onModuleInit(): void {
    this.logger.log('MongoDB module is being initialized');
    this.logConfiguration();
  }

  onModuleDestroy(): void {
    this.logger.log('MongoDB module is being destroyed');
  }

  private logConfiguration(): void {
    const host = this.configService.get<string>('MONGODB_HOST', 'localhost');
    const port = this.configService.get<number>('MONGODB_PORT', 27017);
    const database = this.configService.get<string>('MONGODB_DATABASE', 'inventory_nosql');
    const useAuth = this.configService.get<boolean>('MONGODB_USE_AUTH', true);

    this.logger.log(`MongoDB Connection Details:`);
    this.logger.log(`  - Host: ${host}`);
    this.logger.log(`  - Port: ${port}`);
    this.logger.log(`  - Database: ${database}`);
    this.logger.log(`  - Authentication: ${useAuth ? 'Enabled' : 'Disabled'}`);
  }
}

// === ARCHIVO: api/src/dto/create-product.dto.ts ===
import { IsString, IsNumber, Min, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsPositiveNumber } from '../common/validations/is-positive-number.decorator';
import { UniqueProductName } from '../common/validations/unique-product-name.decorator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gaming Pro',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  @UniqueProductName()
  name: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositiveNumber({ message: 'El precio debe ser un número positivo' })
  price: number;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: 50,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónicos',
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @MaxLength(50, { message: 'La categoría no puede exceder 50 caracteres' })
  category: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del producto',
    example: 'Laptop de alta gama para gaming y diseño gráfico',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Código SKU del producto',
    example: 'LAP-PRO-001',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El SKU no puede exceder 50 caracteres' })
  sku?: string;
}

// === ARCHIVO: api/src/application/services/product.service.ts ===
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

// === ARCHIVO: api/src/common/validations/is-positive-number.decorator.ts ===
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

// === ARCHIVO: api/src/common/validations/unique-product-name.decorator.ts ===
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

// === ARCHIVO: api/prisma/schema.prisma ===
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(uuid())
  name        String   @db.VarChar(255)
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @db.Integer
  category    String   @db.VarChar(100)
  description String?  @db.Text
  sku         String?  @unique @db.VarChar(50)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now()) @db.Timestamp(6)
  updatedAt   DateTime @updatedAt @db.Timestamp(6)

  @@index([name])
  @@index([category])
  @@index([isActive])
  @@index([createdAt])
}

model Category {
  id          String    @id @default(uuid())
  name        String    @unique @db.VarChar(100)
  description String?   @db.Text
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now()) @db.Timestamp(6)
  updatedAt   DateTime  @updatedAt @db.Timestamp(6)
  products    Product[]

  @@index([isActive])
}

model InventoryLog {
  id         String   @id @default(uuid())
  productId  String   @db.VarChar(36)
  action     String   @db.VarChar(50)
  quantity   Int      @db.Integer
  previousStock Int   @db.Integer
  newStock   Int      @db.Integer
  reason     String?  @db.Text
  performedBy String  @db.VarChar(100)
  createdAt  DateTime @default(now()) @db.Timestamp(6)

  @@index([productId])
  @@index([action])
  @@index([createdAt])
}

enum ProductStatus {
  AVAILABLE
  OUT_OF_STOCK
  DISCONTINUED
  RESERVED
}

enum LogAction {
  CREATE
  UPDATE
  DELETE
  STOCK_ADJUSTMENT
  RESTOCK
  SALE
}

// === ARCHIVO: api/src/infrastructure/schemas/product.schema.ts ===
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

// === ARCHIVO: api/src/dto/update-product.dto.ts ===
import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  category?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  sku?: string;
}

// === ARCHIVO: api/src/infrastructure/config/configuration.ts ===
import { registerAs } from '@nestjs/config';

export const configuration = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    sql: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      name: process.env.DATABASE_NAME || 'inventory',
    },
    nosql: {
      host: process.env.MONGODB_HOST || 'localhost',
      port: parseInt(process.env.MONGODB_PORT || '27017', 10),
      database: process.env.MONGODB_DATABASE || 'inventory_nosql',
      username: process.env.MONGODB_USERNAME || 'mongo',
      password: process.env.MONGODB_PASSWORD || 'mongo',
    },
  },
  environment: process.env.NODE_ENV || 'development',
}));

export interface AppConfig {
  port: number;
  database: {
    sql: {
      host: string;
      port: number;
      username: string;
      password: string;
      name: string;
    };
    nosql: {
      host: string;
      port: number;
      database: string;
      username: string;
      password: string;
    };
  };
  environment: string;
}

// === ARCHIVO: client/package.json ===
{
  "name": "inventory-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@tanstack/react-query": "5.45.0",
    "axios": "1.7.2",
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "react-hook-form": "7.52.0",
    "react-router-dom": "^6.22.0",
    "zod": "3.23.8"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.4.5",
    "@testing-library/react": "16.0.0",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.3.1",
    "eslint": "8.57.0",
    "eslint-plugin-react": "7.34.2",
    "eslint-plugin-react-hooks": "4.6.2",
    "eslint-plugin-react-refresh": "0.4.7",
    "typescript": "^5.7.3",
    "vite": "5.3.1",
    "vitest": "1.6.0"
  }
}


// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductList } from '@/features/products/ProductList';
import { ProductForm } from '@/features/products/ProductForm';

export default function App() {
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
  };

  const handleCloseForm = () => {
    setProductToEdit(null);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Gestión de Inventario</h1>
          <nav>
            <Link to="/">Productos</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <button
                    className="add-button"
                    onClick={() => setProductToEdit(null)}
                  >
                    Agregar Producto
                  </button>
                  <ProductList onEdit={handleEdit} />
                  {productToEdit !== null && (
                    <ProductForm
                      product={productToEdit}
                      onClose={handleCloseForm}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/new"
              element={<ProductForm onClose={handleCloseForm} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de inventarios - CRUD de productos" />
    <meta name="keywords" content="inventario, productos, CRUD, gestión" />
    <meta name="author" content="Equipo de Desarrollo" />
    <meta name="robots" content="index, follow" />
    <title>Gestión de Inventarios</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f5f5f5;
        color: #333;
        line-height: 1.6;
      }
      
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
      
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-size: 1.25rem;
        color: #666;
      }
      
      .error-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        flex-direction: column;
        gap: 1rem;
      }
      
      .error-container h1 {
        color: #d32f2f;
        font-size: 1.5rem;
      }
      
      .error-container p {
        color: #666;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading-container">
        <span>Cargando aplicación...</span>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/products/ProductList.tsx ===
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './types';

const API_URL = 'http://localhost:3000';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este producto?')) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error(err);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (product: Product) => {
    try {
      const { id, createdAt, updatedAt, ...updateData } = product;
      await axios.put(`${API_URL}/products/${id}`, updateData);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setError('Error al actualizar el producto');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="product-list">
        <div className="loading">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {error && <div className="error-message">{error}</div>}
      <button onClick={fetchProducts} className="refresh-btn">
        Actualizar
      </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              {editingId === product.id ? (
                <EditableRow
                  product={product}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-btn"
                    >
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="empty-message">No hay productos disponibles</div>
      )}
    </div>
  );
}

interface EditableRowProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

function EditableRow({ product, onSave, onCancel }: EditableRowProps) {
  const [formData, setFormData] = useState<Product>(product);

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <td>{product.id}</td>
      <td>
        <input
          type="text"
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={e => handleChange('price', parseFloat(e.target.value) || 0)}
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          value={formData.stock}
          onChange={e => handleChange('stock', parseInt(e.target.value) || 0)}
        />
      </td>
      <td>
        <input
          type="text"
          value={formData.category}
          onChange={e => handleChange('category', e.target.value)}
        />
      </td>
      <td className="actions">
        <button onClick={() => onSave(formData)} className="save-btn">
          Guardar
        </button>
        <button onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
      </td>
    </>
  );
}

// === ARCHIVO: client/src/features/products/ProductForm.tsx ===
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { CreateProductDto, Product } from './types';

const API_URL = 'http://localhost:3000';

const productSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  price: z.number()
    .min(0.01, 'El precio debe ser mayor a 0')
    .max(999999.99, 'El precio excede el límite permitido'),
  stock: z.number()
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  category: z.string()
    .min(1, 'La categoría es requerida')
    .max(50, 'La categoría no puede exceder 50 caracteres'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSuccess?: () => void;
  initialData?: Product;
}

export function ProductForm({ onSuccess, initialData }: ProductFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: initialData
      ? {
          name: initialData.name,
          price: initialData.price,
          stock: initialData.stock,
          category: initialData.category,
        }
      : {
          name: '',
          price: 0,
          stock: 0,
          category: '',
        },
  });

  const onSubmit = async (data: ProductFormData) => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      if (initialData) {
        const { id, createdAt, updatedAt, ...updateData } = { id: initialData.id, ...data };
        await axios.put(`${API_URL}/products/${initialData.id}`, updateData);
      } else {
        const createDto: CreateProductDto = {
          name: data.name,
          price: data.price,
          stock: data.stock,
          category: data.category,
        };
        await axios.post(`${API_URL}/products`, createDto);
      }

      setSubmitSuccess(true);
      reset();
      
      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setSubmitError('Ya existe un producto con ese nombre');
        } else {
          setSubmitError(err.response?.data?.message || 'Error al guardar el producto');
        }
      } else {
        setSubmitError('Error inesperado al guardar el producto');
      }
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del producto</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Ingrese el nombre del producto"
          />
          {errors.name && (
            <span className="error">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price', { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.price && (
            <span className="error">{errors.price.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min="0"
            {...register('stock', { valueAsNumber: true })}
            placeholder="0"
          />
          {errors.stock && (
            <span className="error">{errors.stock.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            id="category"
            type="text"
            {...register('category')}
            placeholder="Ingrese la categoría"
          />
          {errors.category && (
            <span className="error">{errors.category.message}</span>
          )}
        </div>

        {submitError && (
          <div className="form-error">{submitError}</div>
        )}

        {submitSuccess && (
          <div className="form-success">
            {initialData ? 'Producto actualizado correctamente' : 'Producto creado correctamente'}
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            disabled={!isValid || submitting}
            className="submit-btn"
          >
            {submitting
              ? 'Guardando...'
              : initialData
              ? 'Actualizar'
              : 'Crear Producto'}
          </button>
          
          <button
            type="button"
            onClick={() => reset()}
            className="reset-btn"
            disabled={submitting}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/setupTests.ts ===
// Setup de tests generado automaticamente (referenciado por la config del runner).
// Agrega aca matchers globales o mocks compartidos.
export {};


// === ARCHIVO: client/src/features/products/types.ts ===
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}

// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```

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
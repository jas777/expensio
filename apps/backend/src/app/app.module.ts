import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../shared/database/constants';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(databaseConfig as Partial<TypeOrmModuleOptions>),
  ],
})
export class AppModule {}

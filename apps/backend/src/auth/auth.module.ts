import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../shared/auth/LocalStrategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import constants from '../shared/auth/constants';
import { JwtStrategy } from "../shared/auth/JwtStrategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "../shared/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: constants.secret,
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

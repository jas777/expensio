import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../shared/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../shared/auth/LocalStrategy';
import { JwtStrategy } from '../shared/auth/JwtStrategy';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: '123',
          signOptions: {
            expiresIn: '2h',
          },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

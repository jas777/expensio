import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../shared/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import constants from '../shared/auth/constants';
import { LocalStrategy } from '../shared/auth/LocalStrategy';
import { JwtStrategy } from '../shared/auth/JwtStrategy';
import { AuthController } from './auth.controller';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

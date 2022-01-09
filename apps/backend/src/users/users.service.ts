import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../shared/entities/user.entity';
import { Repository } from 'typeorm';
import UserDTO from '../shared/entities/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findOne(id: string): Promise<null | UserEntity> {
    return this.usersRepository.findOne(id);
  }
}

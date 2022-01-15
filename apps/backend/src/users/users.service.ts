import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../shared/entities/user.entity';
import { Repository } from 'typeorm';
import { User } from "../shared/users/User";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findOne(id: string): Promise<Partial<User> | null> {
    return (await this.usersRepository.findOne(id)).toResponseObject();
  }

}

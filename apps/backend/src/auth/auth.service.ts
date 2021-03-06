import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../shared/users/User';
import { Repository } from 'typeorm';
import UserEntity from '../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UserDTO from '../shared/entities/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<Partial<User> | null> {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email: username }],
    });

    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const { password, ...rest } = user;
        return rest;
      }
    }
    return null;
  }

  async login(user: Partial<User>) {

    const userEntity = await this.usersRepository.findOne(user.id);

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...userEntity.toResponseObject()
    };
  }

  async register(dto: UserDTO) {
    const { username, password } = dto;

    let user = await this.usersRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);

    return user.toResponseObject();
  }
}

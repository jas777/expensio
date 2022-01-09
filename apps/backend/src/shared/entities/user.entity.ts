import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsAlphanumeric, IsEmail, IsUUID } from 'class-validator';
import { User } from '../users/User';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column('varchar', { length: 256 })
  @IsEmail()
  email: string;

  @Column('varchar', { length: 64 })
  @IsAlphanumeric()
  username: string;

  @Column('varchar', { length: 256 })
  password: string;

  toResponseObject(showPassword = false): Partial<User> {
    const { id, email, username, password } = this;

    const returnObj: Partial<User> = {
      id,
      email,
      username,
    };

    if (showPassword) {
      returnObj.password = password;
    }

    return returnObj;
  }
}
